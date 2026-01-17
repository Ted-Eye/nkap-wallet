import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import {useParams} from 'react-router-dom'
import { useWallet } from '../contexts/WalletContext'
import { Delete, Edit } from '@mui/icons-material'
export default function WalletDetailsPage() {
    const {title} = useParams()
    const {wallets} = useWallet()
    const wallet = wallets.find((w)=>w.title===title)
    const transactions = wallet.transactions
    console.log(wallet)
    return (
        <Container sx={{mt: 8}}>
            <h2>wallet details: { title }</h2>
            <Box mt= {4}>
                <small>
                Transactions status: { wallet.status}
                </small>
                <Typography variant='subtitle2' mt={2}>
                    {wallet.note}
                </Typography>
            </Box>
            <Stack >
            </Stack>
        </Container>
    )
}
