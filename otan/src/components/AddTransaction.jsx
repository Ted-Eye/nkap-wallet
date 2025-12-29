import { useEffect, useState } from 'react'
import {Box, TextField, Select, InputLabel, MenuItem, FormControl, InputAdornment, Input, FilledInput, OutlinedInput, Button, Paper, Container, Typography} from '@mui/material';

import dayjs from 'dayjs';

import {PostAdd} from '@mui/icons-material'
import IncomeSources from '../pages/walletsList/IncomeSources';
import ExpenseMotives from '../pages/walletsList/ExpenseMotives';
import React from 'react';
import { useFormContext } from 'react-hook-form';


const AddTransaction = ({initialData, onClose, onSubmit, targetWallet, handleSubmit}) => {
    const {register, control, formState: {errors}} = useFormContext();

    return (
        <>
            <Box component="form" onSubmit={onSubmit} sx={{ p: 4, bgcolor: '#cfe8fc', border: '2px solid #000', boxShadow: 24,}}>
                <Typography variant="h4" gutterBottom>
                Add a new transaction:
            </Typography>
            <TextField {...register('amount')} 
							fullWidth
							margin='normal'
							label='Transaction Amount' 
							error={!!errors.amount}
							helperText={errors.amount?.message}
                            type='number'
							>

				</TextField>
            <TextField {...register('note')} 
							fullWidth
							margin='normal'
							label='Transaction Note' 
							error={!!errors.note}
							helperText={errors.note?.message}
							>
				</TextField>
                <Button onClick={onClose} variant="outlined" sx={{marginRight: 5}}>Cancel</Button>
                <Button type="submit" variant="outlined" >Add Transaction</Button>
            </Box>
            

            {/* <Box>
                <Container>
                    Recent Transactions
                </Container>
            </Box>

            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                >
                <div>
                <FormControl sx={{ m: 1 }}>
                    <InputLabel id="type-select">Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newTransaction.type}
                    label="Type"
                    name='type'
                    // color={type === "Cash-out"? 'warning': "success"}
                    onChange={handleChange}
                    >
                    <MenuItem value="Cash-in">Cash-in</MenuItem>
                    <MenuItem value="Cash-out">Cash-out</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1 }}>
                    <InputLabel  
                        htmlFor="amount"
                        >Enter Amount</InputLabel>
                    <OutlinedInput
                    id="filled-adornment-amount"
                    label="Enter Amount"
                    value={newTransaction.amount}
                    name='amount'
                    onChange={handleChange}
                    startAdornment={<InputAdornment position="start">FCFA</InputAdornment>}
                    />
                </FormControl>
                
                <FormControl sx={{ m: 1 }}>
                    <InputLabel  
                        htmlFor="note"
                        >Enter a brief note</InputLabel>
                    <OutlinedInput 
                    required
                    id="outlined-required"
                    label="Enter a brief note"
                    onChange={handleChange}
                    value={newTransaction.note}
                    name='note'
                    placeholder="Brief note(optional)"
                />
                </FormControl>

                <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="motive" 
                                id="transaction-motive"
                                >{newTransaction.type === "Cash-out"? "Motive": "Source"}</InputLabel>
                    
                    {
                        newTransaction.type == "Cash-in"? 
                        <IncomeSources 
                        Select ={Select}
                        type={newTransaction.type}
                        motive={newTransaction.motive}
                        name={"motive"}
                        handleChange={handleChange}
                        MenuItem={MenuItem}/>
                        : <ExpenseMotives
                        Select ={Select}
                        type={newTransaction.type}
                        motive={newTransaction.motive}
                        name={"motive"}
                        handleChange={handleChange}
                        MenuItem={MenuItem}
                        />
                    }
                    
                </FormControl>

                </div>
                
                <Button 
                        onClick={handleCancel}
                        variant="outlined"
                        style={{textTransform: 'none'}}
                        >
                    <PostAdd/>Cancel
                </Button>

                <Button 
                        onClick={handleSubmit}
                        variant="outlined"
                        style={{textTransform: 'none'}}
                        >
                    <PostAdd/>Submit
                </Button>
            </Box> */}
        </>
    )
}

export default AddTransaction
