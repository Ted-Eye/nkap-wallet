import { useEffect, useState } from 'react'
import {Box, TextField, Select, InputLabel, MenuItem, FormControl, InputAdornment, Input, FilledInput, OutlinedInput, Button, Paper} from '@mui/material';

import {PostAdd} from '@mui/icons-material'
import IncomeSources from '../pages/walletsList/IncomeSources';
import ExpenseMotives from '../pages/walletsList/ExpenseMotives';

const AddTransaction = ({userSettings}) => {
    
    const [type, setType] = useState('Cash-in')
        const [amount, setAmount] = useState(0);
        const [motive, setMotive] = useState('');
        const [note, setNote] = useState('')
        const [date, setDate] = useState('');
        const [transactions, setTransactions] = useState(()=>{
            return JSON.parse(localStorage.getItem('transactions')) || []
        })
    
    const handleChange = (e)=>{
        setMotive(e.target.value)
    }

    useEffect(()=>{
        if(type==="Cash-in"){
            setMotive("Salary")
        }else if(type==="Cash-out"){
            setMotive("Shopping")
        }
    }, [type])
    const handleSubmit = ()=>{
        const newTransactions = [...transactions, {
                
                // id: transactions.length === 0? 1 : (transactions.length + 1),
                id: crypto.randomUUID(),
                type: type,
                amount: parseInt(amount),
                motive: motive,
                date: date,
            },];
            if(amount==0){
                alert('Please enter amount')
            }else if(motive.length <= 3){
                alert('Please enter a valid motive/source')
            }else if(type === "Cash-out" && amount >= parseInt(userSettings.marginalBalance)){
                alert("Can't afford this this item. ")
            }
            else {
                localStorage.setItem('transactions', JSON.stringify(transactions))
                setTransactions(newTransactions);
                alert("Transaction added successfully!")
                setAmount(0);
                setType('Cash-in');
                setMotive(motive);
                setDate(date);                
                    }
    }

    useEffect(()=>{
        localStorage.setItem('transactions', JSON.stringify(transactions))
    },[transactions])


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
                    <InputLabel id="type-select">Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    // color={type === "Cash-out"? 'warning': "success"}
                    onChange={(e)=>{setType(e.target.value)}}
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
                    value={amount}
                    onChange={(e)=>{setAmount(e.target.value)}}
                    startAdornment={<InputAdornment position="start">{userSettings.currency}</InputAdornment>}
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
                    onChange={(e)=>setNote(e.target.value)}
                    value={note}
                    placeholder="Brief note(optional)"
                />
                </FormControl>

                <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="motive" id="transaction-motive">{type === "Cash-out"? 'Motive': "Source"}</InputLabel>
                    
                    {
                        type == "Cash-in"? 
                        <IncomeSources 
                        Select ={Select}
                        type={type}
                        motive={motive}
                        handleChange={handleChange}
                        MenuItem={MenuItem}/>
                        : <ExpenseMotives
                        Select ={Select}
                        type={type}
                        motive={motive}
                        handleChange={handleChange}
                        MenuItem={MenuItem}
                        />
                    }
                    
                </FormControl>

                </div>
                <Button 
                        onClick={handleSubmit}
                        variant="outlined"
                        style={{textTransform: 'none'}}
                        >
                    <PostAdd/>Add
                </Button>
            </Box>
        </>
    )
}

export default AddTransaction
