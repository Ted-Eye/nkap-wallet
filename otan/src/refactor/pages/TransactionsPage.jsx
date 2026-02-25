import { Box, Container, 
    Stack, Typography,
    Table, TableBody, 
    TableCell, TableContainer, 
    TableHead, TableRow, Paper
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useWallet } from '../contexts/WalletContext';
import {Link} from 'react-router-dom'
import { usePrefs } from '../contexts/PrefsContext';
import { formatDateTime } from '../utils/helperFunctions/Utils';
import { Heading } from '../components/global/typography/Typo';

const createData = (type, amount, status, wallet, date) => {
    return { type, amount, status, wallet, date };
}

export default function TransactionsPage() {

    const {transactions, funding, wallets} = useWallet();
    const {prefs} = usePrefs();
    const rows = transactions.map((tx)=> createData(
        tx.transactionType,
        `${tx.amount} ${prefs.currency}`,
        tx.status,
        tx.wallet,
        tx.timestamp
    ))
    console.log(transactions[0])
    return (
            <Container>
                <Typography pt={20} >
                    <Heading text={`All Transactions: ${transactions.length}`}/>
                </Typography>
                    
                <TableContainer component={Paper} sx={{bgcolor: '#d4c3867d', }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    
                    <TableHead>
                        <TableRow sx={{bgcolor: '#eda113ff'}}>
                            <TableCell sx={{color: '#d8eae8c1'}}>Transaction</TableCell>
                            <TableCell align="left" sx={{color: '#d8eae8c1'}}>Amount</TableCell>
                            <TableCell align="left" sx={{color: '#d8eae8c1'}}>Status</TableCell>
                            <TableCell align="left" sx={{color: '#d8eae8c1'}}>Wallet</TableCell>
                            <TableCell align="left" sx={{color: '#d8eae8c1'}}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell 
                        
                        component="th" scope="row">
                            {
                                row.type==='Receive'? 'Deposit' : 'Withdrawal'
                            }
                        </TableCell>
                        <TableCell 
                        align="left">{row.amount}</TableCell>
                        <TableCell align="left">{row.status}</TableCell>
                        <TableCell align="left">{
                        row.wallet===funding.id? 'Funding wallet'
                        : wallets.find((w)=>w.id===row.wallet)?.title
                        }</TableCell>
                        <TableCell align="left">{formatDateTime(row.date)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
                </Container>
    )

};