import { createContext, useContext, useEffect, useState } from "react";
import api from "../../api";
import {useNavigate} from 'react-router-dom'
import { ACCESS_TOKEN, ALERT, REFRESH_TOKEN } from "../lib/konstants/Defaults";
import { set } from "zod";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const[user, setUser] = useState(null);
    const [profile, setProfile] = useState(null)
    const [isAuth, setIsAuth] = useState(false);
    const [wallets, setWallets] = useState([]);
    const [funding, setFunding] = useState({})
    const [transactions, setTransactions] = useState([]);
    const [activeWalletID, setActiveWalletID] = useState(null);
    const [prefs, setPrefs] = useState(()=>{
        return JSON.parse(localStorage.getItem('prefs')) || {}
    });
    const [loading, setLoading] = useState(true);
    const [authAlert, setAuthAlert] = useState({type: '', message: ''})
    const [alert, setAlert] = useState(ALERT)
    console.log(alert)
    // Initialize activeWalletID from localStorage so consumers don't see null
    useEffect(() => {
        const saved = localStorage.getItem('activeWallet')
        if (!saved || saved === 'undefined') return
        try {
            const parsed = JSON.parse(saved)
            if (parsed?.id) {
                setActiveWalletID(parsed.id)
                // console.log('Initialized activeWalletID from localStorage:', parsed.id)
            }
        } catch (e) {
            console.warn('Failed to parse activeWallet from localStorage', e)
        }
    }, [])

    // FETCH USER'S WALLETS !!!
        const getWallets = async () => {
            setLoading(true)
            try {
                const response = await api.get('users/wallets/');
                const data = response.data;

                // GET USER'S FUNDING WALLET
                const [hub] = data.filter((item)=>item.walletType==='root')
                setFunding(hub)

                // GET USER  STANDARD WALLETS
                const walletList = data.filter
                ((item)=>item.walletType==='standard')
                setWallets(walletList);
                setLoading(false)
                return data;
            } catch (error) {
                console.error('Error fetching wallets:', error, error.response?.status);
                // Fallback to localStorage if API fails
                const savedWallets = localStorage.getItem('wallets');
                if (savedWallets) {
                    console.log('Loading wallets from localStorage');
                    setWallets(JSON.parse(savedWallets));
                    return JSON.parse(savedWallets);
                }
            }
    };

    // FETCH USER'S TRANSACTIONS !!!
    const getTransactions = async () => {
        setLoading(true)
        try {
            const response = await api.get(`users/transactions/`);
            const data = response.data;
            setTransactions(data);
            setLoading(false);
            setLoading(false)
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            return [];
        } 
    }
    // FETCH USER PREFERENCES
    const getPrefs = async () => {
        try {
            const response = await api.get(`users/preferences/`);
            const data = response.data;
            setPrefs(data);
            localStorage.setItem('prefs', JSON.stringify(data))
            return data;
        } catch (error) {
            console.error('Error fetching preferences:', error);
            return {};
        } 
    }
    useEffect(()=>{

            // INITIALIZE USER AUTHENTICATION
            const initAuth = async()=>{
            const token = localStorage.getItem(ACCESS_TOKEN)
            if(token) {
                try {
                    const res = await api.get('users/me/')
                    const userData = res.data[0];
                    setUser(userData)
                    setIsAuth(true)
                    await getPrefs()
                    await getWallets()
                    await getTransactions()
                } catch (error) {
                    console.error('Error during authentication initialization:', error);
                    setIsAuth(false)
                } finally {
                    setLoading(false)
                }
            } else {
                setIsAuth(false)
                setLoading(false)
            }
        }

        initAuth()
    }, [])

    // Set active wallet when wallets load
    useEffect(() => {
        if (wallets.length > 0) {
            getActiveWallet()
            // console.log('wallets loaded, count:', wallets.length);
            // console.log('Fetched transactions:', transactions);
        }
    }, [wallets])

    const getActiveWallet = () => {
        const savedWalletStr = localStorage.getItem('activeWallet')
        const savedWallet = savedWalletStr && savedWalletStr !== 'undefined' ? JSON.parse(savedWalletStr) : null

        const id = savedWallet?.id ?? wallets[0]?.id ?? null
        if (!id) {
            console.warn('getActiveWallet: no wallet id available')
            return
        }

        // Set state from the computed id (do not rely on state for immediate lookup)
        setActiveWalletID(id)

        // Find the active wallet using the computed id and persist it
        const activeWallet = wallets.find((w) => w.id === id)
        if (activeWallet) {
            try {
                localStorage.setItem('activeWallet', JSON.stringify(activeWallet))
            } catch (e) {
                console.warn('Failed to persist activeWallet', e)
            }
        }
    }
    const switchActiveWallet = (id)=>{
        const selected = wallets.find((w)=>w.id===id)
        if (!selected) {
            console.error('Wallet not found');
            return;
        }
        setActiveWalletID(selected.id)
        localStorage.setItem('activeWallet', JSON.stringify(selected))
    }
    const navigate = useNavigate()
    const register = async (credentials)=>{
        setLoading(true)
        try {
            const res = await api.post('users/', credentials)
            if(res.status === 201) {
                setAuthAlert({type: 'success', message: 'Registration successful! Please log in with your username and password to continue.'})
                navigate('/login')
                setLoading(false)
            }
        } catch (error) {
            console.error('Registration failed:', error);
            if (error.code==='ERR_NETWORK') {
                setAuthAlert({type: 'error', message: 'Please check your internet connection and try again.'})
                // navigate('/register') 
            } else if (error.response?.status === 400) {
                setAuthAlert({type: 'info', message: 'Username already exists. Please choose a different one.'})
            } else {
                setAuthAlert({type: 'warning', message: 'Registration failed. Please try again.'})
            }
        } finally {
            setLoading(false)
        }
    }
    const login = async (credentials)=> {
        setLoading(true)
        try {
            const res = await api.post('user/token/', credentials)
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            const resUser = await api.get('users/me/')
            console.log(resUser)
            setUser(resUser.data[0])
            setIsAuth(true)
            setLoading(false)
            navigate('/home')
        } catch (error) {
            // console.error('Login failed:', error);
            if (error.code==='ERR_NETWORK') {
                alert(`${error.message}. Pleae check your internet connection and try again`)
                navigate('/login')
            } else if (error.response?.status === 401) {
                // alert('Invalid username or password. Please verify your credentials and try again.')
                setAuthAlert({type: 'error', message: 'Invalid username or password. Please verify your credentials and try again.'})
                navigate('/login')
            }
            else {
                console.error("Failed to login", error)
                alert("Wrong username or password")
            }
            
        } 
        setLoading(false)
    } 
    const logOut = () => {
        const tokens = [ACCESS_TOKEN, REFRESH_TOKEN, 'activeWallet']
        for (let i=0; i<tokens.length; i++){
            localStorage.removeItem(tokens[i])
        }
        setIsAuth(false)
        navigate('/')

    }
    useEffect(()=>{
        if (authAlert.type) {
            const timer = setTimeout(() => {
                setAuthAlert({type: '', message: ''})
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [authAlert])
    const value = {
        user, isAuth, loading, register,
        login, getWallets, activeWalletID, funding, prefs,
        wallets, logOut, switchActiveWallet,
        transactions, getTransactions, setLoading, authAlert
    }
    
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
export const useAuth = () => {
    return useContext(AuthContext);
}