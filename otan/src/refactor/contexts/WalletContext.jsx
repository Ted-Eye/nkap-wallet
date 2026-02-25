import React, { createContext, use, useContext, useEffect, useState } from 'react';
import { DEFAULT_WALLETS} from '../lib/konstants/Defaults';
import { usePrefs } from './PrefsContext';
import api from '../../api';
import { set } from 'zod';
import { useAuth } from './AuthContext';
import { Success } from '../components/global/alerts';


const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const {prefs} = usePrefs()
    const {isAuth, getWallets,funding, wallets, transactions, getTransactions, setLoading, loading, user} = useAuth()
    const [showAlert, setShowAlert] = useState(false)
    const [walletMsg, setWalletMsg] = useState(null)
    const [alertType, setAlertType] = useState(null)
    // useEffect(() => {
    //     getActiveWallet()
    // }, []);
    

    // const activeWallet = wallets.find((w)=>w.id===activeWalletID)
    // useEffect(() => {
    //     if (wallets.length > 0 && !activeWalletID) {
    //         const newID = wallets[0].id
    //         setActiveWalletID(newID);
    //         localStorage.setItem('activeWallet', JSON.stringify(wallets.find((w)=>w.id===newID)))
    //     }
    // }, [wallets]);

    // const activeWallet = wallets.find((w)=>w.id===activeWalletID);
    // useEffect(()=>{
    //     getUser()
    // },[])
    // let user;
    // const getUser = async () => {
    //     try {
    //         const res = await api.get('users/me/')
    //         user = res.data
    //         console.log(user)
    //     } catch (error) {alert(error)}
    // }     



    // const getWallets = async () => {
        
    //     try {
    //         const response = await api.get('users/wallets/');
    //         const data = response.data;

    //         setWallets(data);
    //         const savedWallet = JSON.parse(localStorage.getItem('activeWallet'))
    //         setActiveWalletID(savedWallet? savedWallet.id : data[0]?.id)
    //         localStorage.setItem('activeWallet', JSON.stringify(data[0]))
    //     } catch (error) {
    //         console.error('Error fetching wallets:', error, error.response?.status);
    //         // Fallback to localStorage if API fails
    //         const savedWallets = localStorage.getItem('wallets');
    //         if (savedWallets) {
    //             console.log('Loading wallets from localStorage');
    //             setWallets(JSON.parse(savedWallets));
    //         }
    //     }
    // };
    
    // useEffect(()=>{
    //     if(isAuth) {
    //         setActiveWalletID(JSON.parse(localStorage.getItem('activeWallet')))
    //         console.log(activeWalletID)}
    // }, [])
    
    

    // const [wallets, setWallets] = useState(() => {
    //     return JSON.parse(localStorage.getItem('wallets')) || defaultWallets;
    // });
    
    
    
    // const [transactions, setTransactions] = useState(() => {
    //     const saved = localStorage.getItem('transactions');
    //     return saved ? JSON.parse(saved) : [];
    // });
    useEffect(()=>{
        setWalletMsg(walletMsg)
    }, [showAlert])
    const addTransaction = async (transaction) => {
        setLoading(true)
        try {
            const res = await api.post('users/transactions/', transaction)
            if(res.status===201) {
                getWallets()
                getTransactions()
                setLoading(false)
                setShowAlert(true)
                setWalletMsg("success")
                
            } else  {
                alert('failed: ')
            }
        } catch (error) {
            alert("Failed to record transaction")
            setLoading(false)
            setWalletMsg(error.response.data[0])
        }
        // const updatedTransactions = [...transactions, transaction];
        // setTransactions(updatedTransactions);
        // localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    };
    const rechargeWallet = async (transaction) => {
        setLoading(true)
        try {
            const res = await api.post('users/recharge/', {targetId: transaction.wallet, amount: transaction.amount, note:transaction.note})
            if(res.status===201) {
                setLoading(false)
                getWallets()
                getTransactions()
                setAlertType('success')
                setWalletMsg("success")
                
            } else {
                alert("Failed")
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        } 
    }
    const sendMoney = async (transaction) => {
        setLoading(true)
        try {
            const res = await api.post("users/send/", transaction)
            if(res.status===201) {
                setLoading(false)
                getWallets()
                getTransactions()
                setAlertType('success')
                // setWalletMsg('Transaction completed!')
                
                
            } else {
                alert("Failed")
            }
        } catch (error) {
            setLoading(false)
            if(error.status===400){
                console.log(error)
                const errorwalletMsg = error.response.data.error
                setWalletMsg(errorwalletMsg)
            } else {
                alert('The provided username does not belong to any user! Please verify that you have entered the username correctly')
            }
            
        }
    }
    // HANDLING TRANSACTION EXECUTIONS 

    // 1. HANDLING SENDING TRANSACTIONS :
    const handleSending = (data)=>{
        const targetWallet = wallets.find((w)=>w.id===data.walletID)
        if (!targetWallet) {
            console.error('Wallet not found');
            return;
        }
        const updatedWallet = {
			...targetWallet, 
			accountBalance: targetWallet.accountBalance-parseInt(data.amount),
			expenses: [...targetWallet.expenses, data],
			transactions: [...targetWallet.transactions, data],
			};
        
        const updatedWallets = wallets.map((wallet)=>wallet.id===targetWallet.id? updatedWallet : wallet);
        setWallets(updatedWallets);

        if (updatedWallet) {
            try {
                localStorage.setItem('activeWallet', JSON.stringify(updatedWallet))
            } catch (e) {
                console.warn('Failed to persist activeWallet after sending', e)
            }
        }
        localStorage.setItem('wallets', JSON.stringify(updatedWallets));
        
        addTransaction(data)
        // updateWalletStatus()
        // refreshData()
        const phrase = 'withdrawn from';
			alert(`${prefs.currency} ${data.amount } was ${ phrase } ${updatedWallet.title } successfully!`);
    }

    // 2. HANDLING RECEIVING TRANSACTIONS :
    const handleReceiving = (data)=>{
        const targetWallet = wallets.find((w)=>w.id===data.walletID)
        if (!targetWallet) {
            console.error('Wallet not found');
            return;
        }
        const updatedWallet = {
			...targetWallet, 
			accountBalance: targetWallet.accountBalance+parseInt(data.amount),
			revenues: [...targetWallet.revenues, data],
			transactions: [...targetWallet.transactions, data],
			};
        const updatedWallets = wallets.map((wallet)=>wallet.id===targetWallet.id? updatedWallet : wallet);
			setWallets(updatedWallets);
        if (updatedWallet) {
            try {
                localStorage.setItem('activeWallet', JSON.stringify(updatedWallet))
            } catch (e) {
                console.warn('Failed to persist activeWallet after receiving', e)
            }
        }
        localStorage.setItem('wallets', JSON.stringify(updatedWallets));
        addTransaction(data)
        const phrase = 'deposited to';
			alert(`${prefs.currency} ${data.amount } was ${ phrase } ${targetWallet.title } successfully!`);
    }

    // useEffect(()=>{
    //     switchActiveWallet()
    // },[activeWalletID])

    // const switchActiveWallet = (id)=>{
    //     const selected = wallets.find((w)=>w.id===id)
    //     if (!selected) {
    //         console.error('Wallet not found');
    //         return;
    //     }
    //     setActiveWalletID(selected.id)
    //     localStorage.setItem('activeWallet', JSON.stringify(selected))
    // }
    // useEffect(()=>{
    //     refreshData()
    // }, [handleSending, handleReceiving])



    // WALLET RELATED CRUD OPERATIONS USING API (COMMENTED CODE BLOCKS WORK STRICTLY FRONTEND WITHOUT API)...

    // 1.  ADDING A NEW WALLET
    const addWallet = async (wallet) => {
        try {
            const res = await api.post("users/wallets/", wallet)
            if(res.status===201) alert("Wallet created!")
            getWallets()
        } catch(error) {
            alert("Failed to create")
        }

        // const updatedWallets = [...wallets, wallet];
        // setWallets(updatedWallets);
        // localStorage.setItem('wallets', JSON.stringify(updatedWallets));
    };

    // 2. EDITING AN EXISTING WALLET...
    const editWallet = async(editedWallet) => {

        try {
                const res = await api.patch(`users/wallets/${editedWallet.id}/`, editedWallet)
            if(res.status===200) {
                alert("Edited successfully")
                getWallets()
            }
            } catch (error) {alert(error)}
        // const updatedWallets = wallets.map((wallet) =>
        //     wallet.id === editedWallet.id ? editedWallet : wallet
        // );
        // setWallets(updatedWallets);
        // localStorage.setItem('wallets', JSON.stringify(updatedWallets));
        // switchActiveWallet(updatedWallets[0].id)
    };


    //3. DELETING A WALLET FROM DATABASE
    const deleteWallet = async (id) => {
        if (id==='f88f926c-1ae3-47e3-b0f7-f8f5154721dc'){
            alert('Cannot delete wallet, as its currently active')
        } else {
            try {
                const res = await api.delete(`users/wallets/${id}/`)
            if(res.status===204) {
                alert("Deleted successfully")
                getWallets()
            }
            } catch (error) {alert(error)} 
        }
        

        // if (walletId===activeWalletID){
        //     alert('Cannot delete wallet, as its currently active')
        // }else{
        //     const updatedWallets = wallets.filter((wallet) => wallet.id !== walletId);
        // setWallets(updatedWallets);
        // localStorage.setItem('wallets', JSON.stringify(updatedWallets));
        // alert('Deleted successfully !')
        // }
    };

    const updateWallet = (data)=>{
        wallets.map((w)=>w.id===data.id? data : w)
    }
    // const updateWalletStatus = ()=>{
	// 	wallets.filter((wallet)=>{
	// 		switch(true){
	// 			case (wallet.transactions.length===0):
	// 				wallet.status='blank';
	// 				wallet.note='Make your first deposit and start growing this wallet !'
	// 				break;
	// 			case (wallet.accountBalance>wallet.minBalance):
	// 				wallet.status='healthy'
	// 				wallet.note='Good job maintaining a rich wallet. Keep it growing !'
	// 				break;
				
	// 			case (wallet.accountBalance<=wallet.minBalance && wallet.expenses.length-wallet.revenues.length<3):
	// 				wallet.status='warning'
	// 				wallet.note='Your wallet is getting low. Consider making a deposit.'
	// 				break;
	// 			case (wallet.expenses.length-wallet.revenues.length>=3):
	// 				wallet.status='sinking'
	// 				wallet.note='Please reduce your spending or this wallet may go bankrupt'
	// 				break;
	// 		}
	// 	})
	// }
	// useEffect(()=>{
	// 	updateWalletStatus()
    //     // console.log(activeWallet)
	// }, [wallets])


    // const activeWallet = wallets.find((w)=>w.id===activeWalletID);

    const value = {
        funding, wallets, addWallet, editWallet, deleteWallet, transactions, getWallets, rechargeWallet, sendMoney, addTransaction, handleSending,  handleReceiving, updateWallet, walletMsg, showAlert, alertType, setAlertType
    }
    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    return useContext(WalletContext);
};