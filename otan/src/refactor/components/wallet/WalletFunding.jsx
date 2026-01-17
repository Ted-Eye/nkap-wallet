import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

export default function WalletFunding() {
    const [amount, setAmount] = useState(0)
    const [display, setDisplay] = useState(false)

    const handleClick = ()=>{
        setDisplay(true)
    }
    const handleCloseDisplay = ()=>{
        setDisplay(false)
    }
    return (
        <Stack 
        spacing={2}
        >
            {
                display&& <Stack 
                            sx={{border: 'solid', borderWidth: 1, borderRadius:2, color: 'white'}}
                            padding={2}
                            spacing={2}
                            >
                    <Typography>
                        Enter desired amount to add to this wallet
                    </Typography>
                    <TextField 
                    color='white'
                    label='Enter amount'/>
                    <Button 
                    onClick={handleClick}
                    variant='outlined'>
                            Ok
                    </Button>
                    <Button 
                    onClick={handleCloseDisplay}
                    variant='outlined'>
                            Cancel
                    </Button>
                </Stack>
            }
            <Stack direction={'row'} justifyContent={'center'} spacing={2}>
                <Button 
            onClick={handleClick}
            variant='outlined'>
                        Fund Wallet
            </Button>
            <Button 
            onClick={handleClick}
            variant='outlined'>
                        Withdraw
            </Button>
            </Stack>
        </Stack>
    )
}
