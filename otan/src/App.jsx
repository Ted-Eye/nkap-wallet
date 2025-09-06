
import './App.css'
import { useEffect, useState } from 'react'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Home from './pages/home/Home';

import AddTransaction from './components/AddTransaction';
import TransactionCard from './components/TransactionCard';
import Sidebar from './components/layouts/Sidebar';
import NavBar from './components/layouts/NavBar';
import Wallets from './pages/walletsList/Wallets';
import { Box, Stack } from '@mui/material';
import Feed from './components/layouts/Feed';


function App() {
    
    const [balance, setBalance] = useState(0)
    const [revenues, setRevenues] = useState([])
    const [expenses, setExpenses] = useState([])
    const [transactions, setTransactions] = useState(
            ()=>{
                return JSON.parse(localStorage.getItem('transactions')) || []
            }
        );

    const getTotal = (transactions)=>{
            const total = transactions.reduce((sum, transaction)=> sum + parseInt(transaction.amount), 0);
            return total
        }

    const getTransactions = ()=>{
            const newRevs = [];
            const newExp = [];
            for(const item of transactions){
                if(item.type === 'Cash-in'){
                    newRevs.push(item)
                }else{
                    newExp.push(item);
                }
            }
            setRevenues(newRevs)
            setExpenses(newExp)
        }

        
        const getAccountBalance = ()=>{
            let newBalance = revenues;
            const totalRevenue = getTotal(revenues);
            const totalExpenses = getTotal(expenses);
            newBalance = (totalRevenue - totalExpenses);
            setBalance(newBalance);
            
        }
        

        const handleCancel = (getCurrentId)=>{
            const updatedTransactions = transactions.filter((transaction)=>transaction.id !==getCurrentId)
            setTransactions(updatedTransactions)
            
    }
        
        useEffect(()=>{
            getTransactions();
        },[])

        useEffect(()=>{
            getAccountBalance();
        },[revenues, expenses, transactions]);

        useEffect(()=>{
                localStorage.setItem('transactions', JSON.stringify(transactions))
                getTransactions()
            },[transactions])


    return (
        <Box>

            <NavBar/>
            <Home 
            transactions={transactions}
            revenues={revenues}
            expenses={expenses}
            getTotal={getTotal}
            balance={balance}
            handleCancel = {handleCancel}
        />

            {/* <Wallets/> */}
        </Box>
            
        )
    }

    export default App
