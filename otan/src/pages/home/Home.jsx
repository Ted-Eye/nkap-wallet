import { useEffect, useState } from 'react'
// import './Home.css';
import AddTransaction from '../../components/AddTransaction';
import TransactionCard from '../../components/TransactionCard';
import Preferences from '../../components/Preferences';
import UserPreferences from '../../components/UserPreferences';
import Sidebar from '../../components/layouts/Sidebar';
import NavBar from '../../components/layouts/NavBar';


import CssBaseline from '@mui/material/CssBaseline';
import {Box, Container, Stack} from '@mui/material'
import Wallets from '../walletsList/Wallets';
import Feed from '../../components/layouts/Feed';





const Home = ({transactions, revenues, expenses, getTotal, balance, handleCancel}) => {

    

    
    const [userSettings, setUserSettings] = useState(()=>{
            return JSON.parse(localStorage.getItem('settings')) || {currency: 'FCFA', marginalBalance: 0, purchasingPower: 0, monthlyLimit: 0 }
        })

    const getUserSettings = () =>{
        setUserSettings(JSON.parse(localStorage.getItem('settings')))
    }
    
    const recentTransactions = (transactions?.length<=4? transactions :
    transactions.filter((transaction)=>transactions.indexOf(transaction)>=transactions.length - 4))

    const getRecentTransactions=()=>{

    }
    
    const updateUserSettings = (newSettings)=>{
        localStorage.setItem('settings', JSON.stringify(newSettings));
        getUserSettings()
    }
    
    useEffect(()=>{
        getUserSettings()
    },[])
    
    useEffect(()=>{
        localStorage.setItem('settings', JSON.stringify(userSettings))
        
    },[userSettings])
    


    return (
        <>  
            <CssBaseline />
            
                <Box 
                    sx={{ bgcolor: '#cfe8fc', width: 'xl'}}
                >
                    <Stack direction={'row'} justifyContent={'space-between'} >
                
                        <Feed
                                        transactions={transactions}
                                    revenues={revenues}
                                    expenses={expenses}
                                    getTotal={getTotal}
                                    balance={balance}
                                    handleCancel = {handleCancel}
                                    userSettings={userSettings}
                                    />
                        <Sidebar onSave={updateUserSettings} userSettings={userSettings}/>
                    </Stack>
                    
                    
                        {/* <div className="sub-contents">
                            <div className="sub-bloc1">
                                <div className='recent-transactions'>
                                    <h2>Recent Transactions</h2>
                                    <div className='transactions-show'>
                                        {
                                        recentTransactions.map((transaction)=>
                                            transaction.type === 'cash-in' ? 
                                                <TransactionCard 
                                                transaction={transaction}
                                                key={transaction.id}
                                                userSettings={userSettings}
                                                handleCancel={handleCancel}
                                                />
                                            
                                        : <TransactionCard 
                                                transaction={transaction}
                                                key={transaction.id}
                                                userSettings={userSettings}
                                                handleCancel={handleCancel}
                                                recentTransactions={recentTransactions}
                                                />
                                        )
                                    }
                                    </div>
                                    
                                </div>
                            <div className='total-revenu'>
                                Total revenue
                                <h3>
                                    {getTotal(revenues)} FCFA
                                </h3>
                            </div>
                            </div>
                            <div className="total-expenses">
                                Total expenses
                                <h3>
                                    {getTotal(expenses)} FCFA
                                </h3>
                            </div>
                        </div>

                        <div className='info-section'>
                        <h1>
                            Info bar and flash messages
                        </h1>
                        </div>
                    <div className='footer'>
                            <h1>Footer</h1>
                        </div> */}
                    
                </Box>
        </>
    )
}

export default Home
