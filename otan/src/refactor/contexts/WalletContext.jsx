import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_WALLETS} from '../lib/konstants/Defaults';
import { usePrefs } from './PrefsContext';


const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const defaultWallets = DEFAULT_WALLETS;
    const {prefs} = usePrefs()
    const [wallets, setWallets] = useState(() => {
        return JSON.parse(localStorage.getItem('wallets')) || defaultWallets;
    });
    const [activeWalletID, setActiveWalletID] = useState(()=>{
        const savedWallet = JSON.parse(localStorage.getItem('activeWallet'))
        return savedWallet?.id || wallets[0]?.id 
    });
    const activeWallet = wallets.find((w)=>w.id===activeWalletID)
    
    const [transactions, setTransactions] = useState(() => {
        return JSON.parse(localStorage.getItem('transactions')) || [];
    });
    useEffect(()=>{
        localStorage.setItem('transactions', JSON.stringify(transactions))
        localStorage.setItem('wallets', JSON.stringify(wallets))
    }, [])
    const addTransaction = (transaction) => {
        const updatedTransactions = [...transactions, transaction];
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    };

    // HANDLING TRANSACTION EXECUTIONS 

    // 1. HANDLING SENDING TRANSACTIONS :
    const handleSending = (data)=>{
        const [targetWallet] = wallets.filter((w)=>w.id===data.walletID)
        const updatedWallet = {
			...targetWallet, 
			accountBalance: targetWallet.accountBalance-parseInt(data.amount),
			expenses: [...targetWallet.expenses, data],
			transactions: [...targetWallet.transactions, data],
			};
        
        const updatedWallets = wallets.map((wallet)=>wallet.id===targetWallet.id? updatedWallet : wallet);
        setWallets(updatedWallets);

        localStorage.setItem('activeWallet', JSON.stringify(updatedWallet))
        localStorage.setItem('wallets', JSON.stringify(updatedWallets));
        
        addTransaction(data)
        // updateWalletStatus()
        // refreshData()
        const phrase = 'withdrawn from';
			alert(`${prefs.currency} ${data.amount } was ${ phrase } ${updatedWallet.title } successfully!`);
    }

    // 2. HANDLING RECEIVING TRANSACTIONS :
    const handleReceiving = (data)=>{
        const [targetWallet] = wallets.filter((w)=>w.id===data.walletID)
        const updatedWallet = {
			...targetWallet, 
			accountBalance: targetWallet.accountBalance+parseInt(data.amount),
			revenues: [...targetWallet.revenues, data],
			transactions: [...targetWallet.transactions, data],
			};
        const updatedWallets = wallets.map((wallet)=>wallet.id===targetWallet.id? updatedWallet : wallet);
			setWallets(updatedWallets);
        localStorage.setItem('activeWallet', JSON.stringify(updatedWallet))
        localStorage.setItem('wallets', JSON.stringify(updatedWallets));
        addTransaction(data)
        const phrase = 'deposited to';
			alert(`${prefs.currency} ${data.amount } was ${ phrase } ${targetWallet.title } successfully!`);
    }

    const switchActiveWallet = (id)=>{
        // setActiveWalletID(id)
        const selected = wallets.find((w)=>w.id===id)
        setActiveWalletID(selected.id)
        localStorage.setItem('activeWallet', JSON.stringify(selected))
        // refreshData()
    }
    // useEffect(()=>{
    //     refreshData()
    // }, [handleSending, handleReceiving])



    // WALLET RELATED CRUD OPERATIONS...

    //1.  ADDING A NEW WALLET
    const addWallet = (wallet) => {
        const updatedWallets = [...wallets, wallet];
        setWallets(updatedWallets);
        localStorage.setItem('wallets', JSON.stringify(updatedWallets));
    };

    //2. EDITING AN EXISTING WALLET...
    const editWallet = (editedWallet) => {
        const updatedWallets = wallets.map((wallet) =>
            wallet.id === editedWallet.id ? editedWallet : wallet
        );
        setWallets(updatedWallets);
        localStorage.setItem('wallets', JSON.stringify(updatedWallets));
        switchActiveWallet(updatedWallets[0].id)
    };


    //2. DELETING A WALLET FROM DATABASE
    const deleteWallet = (walletId) => {
        if (walletId===activeWalletID){
            alert('Cannot delete wallet, as its currently active')
        }else{
            const updatedWallets = wallets.filter((wallet) => wallet.id !== walletId);
        setWallets(updatedWallets);
        localStorage.setItem('wallets', JSON.stringify(updatedWallets));
        alert('Deleted successfully !')
        }
    };

    const updateWallet = (data)=>{
        wallets.map((w)=>w.id===data.id? data : w)
    }
    const updateWalletStatus = ()=>{
		wallets.filter((wallet)=>{
			switch(true){
				case (wallet.transactions.length===0):
					wallet.status='blank';
					wallet.note='Make your first deposit and start growing this wallet !'
					break;
				case (wallet.accountBalance>wallet.minBalance):
					wallet.status='healthy'
					wallet.note='Good job maintaining a rich wallet. Keep it growing !'
					break;
				
				case (wallet.accountBalance<=wallet.minBalance && wallet.expenses.length-wallet.revenues.length<3):
					wallet.status='warning'
					wallet.note='Your wallet is getting low. Consider making a deposit.'
					break;
				case (wallet.expenses.length-wallet.revenues.length>=3):
					wallet.status='sinking'
					wallet.note='Please reduce your spending or this wallet may go bankrupt'
					break;
			}
		})
	}
	useEffect(()=>{
		updateWalletStatus()
        // console.log(activeWallet)
	}, [wallets])


    const value = {
        wallets, activeWalletID, activeWallet, addWallet, editWallet,  deleteWallet, transactions, addTransaction, switchActiveWallet, handleSending, handleReceiving
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