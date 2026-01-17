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

const createData = (type, amount, motive, wallet, date) => {
    return { type, amount, motive, wallet, date };
}

export default function TransactionsPage() {

    const {transactions} = useWallet();
    const {prefs} = usePrefs();
    const rows = transactions.map((tx)=> createData(
        tx.type,
        `${prefs.currency} ${tx.amount}`,
        tx.motive,
        tx.wallet,
        tx.date
    ))
    return (
            <Container sx={{mt: 10}}>
                <Typography sx={{mb: 2}}>
                    All Transactions: {`(${transactions.length})`}
                </Typography>
                <TableContainer component={Paper} sx={{bgcolor: 'whitesmoke'}}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow sx={{bgcolor: '#eda113ff'}}>
                            <TableCell sx={{color: 'white'}}>Transaction</TableCell>
                            <TableCell align="left" sx={{color: 'white'}}>Amount</TableCell>
                            <TableCell align="left" sx={{color: 'white'}}>Motive</TableCell>
                            <TableCell align="left" sx={{color: 'white'}}>Wallet</TableCell>
                            <TableCell align="left" sx={{color: 'white'}}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.type}
                        </TableCell>
                        <TableCell align="left">{row.amount}</TableCell>
                        <TableCell align="left">{row.motive}</TableCell>
                        <TableCell align="left">{row.wallet}</TableCell>
                        <TableCell align="left">{formatDateTime(row.date)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Container>
    )

};