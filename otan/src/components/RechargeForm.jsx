import { Box, FormControl, InputLabel, Select, MenuItem, OutlinedInput, InputAdornment, Button } from '@mui/material';
import {PostAdd} from '@mui/icons-material'
import React, { useEffect, useState } from 'react'

export default function RechargeForm({wallets, handleSubmit, targetWallet, defaultValue}) {

    const [deposit, setDeposit] = useState(defaultValue || {
        amount: 0,
        method: '',
        note: ''
        })

    const handleChange = (e)=>{
        setDeposit({...deposit, [e.target.name]: e.target.value})
    }

    const handleDepo = (e)=>{
        e.preventDefault();
        targetWallet.accountBalance = parseInt(targetWallet.accountBalance) + parseInt(deposit.amount);
        alert(`Wallet: "${targetWallet.title}" was recharged with ${deposit.amount} FCFA successfully`);
        localStorage.setItem("wallets", JSON.stringify(wallets))
        console.log(targetWallet)
        

        setDeposit({
            amount: 0,
            method: '',
            note: ''
        });
    }

    useEffect(()=>{
        console.log(wallets)
        // localStorage.setItem("wallets", JSON.stringify(wallets))
    },[])

    return (
        <>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                >
                <div>
                <FormControl sx={{ m: 1 }}>
                    <InputLabel id="type-select">Method</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={deposit.method}
                    name='method'
                    label="Method"
                    onChange={handleChange}
                    >
                    <MenuItem value="OM">OM</MenuItem>
                    <MenuItem value="MoMo">MoMo</MenuItem>
                    <MenuItem value="VISA">VISA</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1 }}>
                    <InputLabel  
                        htmlFor="Amount"
                        >Enter Amount</InputLabel>
                    <OutlinedInput
                    id="filled-adornment-amount"
                    label="Amount"
                    value={deposit.amount}
                    name='amount'
                    onChange={handleChange}
                    startAdornment={<InputAdornment position="start">FCFA</InputAdornment>}
                    />
                </FormControl>
                
                <FormControl sx={{ m: 1 }}>
                    <InputLabel  
                        htmlFor="Note"
                        >Enter a brief note</InputLabel>
                    <OutlinedInput 
                    required
                    id="outlined-required"
                    label="Note"
                    name='note'
                    onChange={handleChange}
                    value={deposit.note}
                    placeholder="Brief note(optional)"
                />
                </FormControl>

                </div>
                <Button 
                        onClick={handleDepo}
                        variant="outlined"
                        style={{textTransform: 'none'}}
                        >
                    <PostAdd/>Add
                </Button>
            </Box>
        </>
    )
}
