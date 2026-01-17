import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_WALLETS} from '../lib/konstants/Defaults';


const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const defaultWallets = DEFAULT_WALLETS;
    const [wallets, setWallets] = useState(() => {
        return JSON.parse(localStorage.getItem('wallets')) || defaultWallets;
    });
    
    const [transactions, setTransactions] = useState(() => {
        return JSON.parse(localStorage.getItem('transactions')) || [];
    });
    const addTransaction = (transaction) => {
        const updatedTransactions = [...transactions, transaction];
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    };
    const addWallet = (wallet) => {
        const updatedWallets = [...wallets, wallet];
        setWallets(updatedWallets);
        localStorage.setItem('wallets', JSON.stringify(updatedWallets));
    };

    const updateWallet = (updatedWallet) => {
        const updatedWallets = wallets.map((wallet) =>
            wallet.id === updatedWallet.id ? updatedWallet : wallet
        );
        setWallets(updatedWallets);
        localStorage.setItem('wallets', JSON.stringify(updatedWallets));
    };

    const deleteWallet = (walletId) => {
        const updatedWallets = wallets.filter((wallet) => wallet.id !== walletId);
        setWallets(updatedWallets);
        localStorage.setItem('wallets', JSON.stringify(updatedWallets));
    };

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
	}, [wallets])


    const value = {
        wallets, addWallet, updateWallet, deleteWallet, transactions, addTransaction
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