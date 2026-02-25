import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'
import api from '../../../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../../lib/konstants/Defaults';
import {Navigate} from 'react-router-dom'
import { useWallet } from '../../contexts/WalletContext';

export default function ProtectedRoutes({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)
    const [loading, setLoading] = useState(false);
    const {getWallets} = useWallet();
    useEffect(()=>{
        auth().catch(()=>setIsAuthorized(false))
    }, [])
    const refreshToken = async()=>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post("/user/token/refresh", {refresh: refreshToken});
            if(res.status===200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.acces)
                setIsAuthorized(true)
                getWallets()
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
        
    }
    const auth = async()=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token) {
            setIsAuthorized(false)
            return    
        }
        const decoded = jwtDecode(token)
        const expiration = decoded.exp
        const now = Date.now() /1000

        if(expiration<now){
            await refreshToken()
        } else {
            setIsAuthorized(true)
            getWallets()
        }
    }
    if(isAuthorized===null) {
        return <div>Loading...</div>
    }
    return isAuthorized? children : <Navigate to="/login"/>
}
