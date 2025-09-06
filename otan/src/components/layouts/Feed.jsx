import { Box } from '@mui/material'
import { lightBlue } from '@mui/material/colors'
import React, { useState } from 'react'
import Home from '../../pages/home/Home'
import AddTransaction from '../AddTransaction'
import Wallets from '../../pages/walletsList/Wallets'

export default function Feed({transactions, revenues, expenses, getTotal, balance, handleCancel, userSettings}) {



    return (
        <Box flex={4}>
            <h2>Your account balance:</h2>
            <h1> <span>{`${balance} ${ userSettings.currency}` }</span>
                
            </h1>
            <div className='sub-main-content'>
                <span>
                    Total Revenue: {`${getTotal(revenues)} ${userSettings.currency}`} 
                    
                </span>
                <span>
                    Total Expenses: {`${getTotal(expenses)} ${userSettings.currency}`}  
                </span>
            </div>
            <div>
                <h3>
                    {
                        getTotal(expenses) >= balance && 
                            "Please reduce your spending or you will soon go broke !"
                    }
                </h3>
            </div>
            <div className='transaction-form'>
                <h3>Add a Transaction</h3>
                <AddTransaction userSettings={userSettings}
                />

            </div>
            <Wallets/>
                
        </Box>
    )
}
