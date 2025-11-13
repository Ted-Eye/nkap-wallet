import { useEffect, useState } from 'react'
import {Box, TextField, Select, InputLabel, MenuItem, FormControl, InputAdornment, Input, FilledInput, OutlinedInput, Button, Paper} from '@mui/material';

import {PostAdd} from '@mui/icons-material'
import IncomeSources from '../pages/walletsList/IncomeSources';
import ExpenseMotives from '../pages/walletsList/ExpenseMotives';

const AddTransaction = ({userSettings, wallets, targetWallet, defaultValues}) => {
    

    // const [type, setType] = useState('Cash-in')
    //     const [amount, setAmount] = useState(0);
    //     const [motive, setMotive] = useState('');
    //     const [note, setNote] = useState('')
    //     const [date, setDate] = useState('');

        const [transactions, setTransactions] = useState(()=>{
            return JSON.parse(localStorage.getItem('transactions')) || []
        })
    
    const [newTransaction, setNewTransaction] = useState({
        id: crypto.randomUUID(),
        wallet:targetWallet.title, 
        type: 'Cash-in', 
        amount: 0, 
        motive: '', 
        note: '', 
        date: ''
    })
    
    
    const handleChange = (e)=>{
        // setMotive(e.target.value)
        setNewTransaction({...newTransaction, [e.target.name]: e.target.value});
        
        // if(newTransaction.type==="Cash-in"){
        //     setNewTransaction(newTransaction=>({...newTransaction, motive:'Salary'}))
        // }else if(newTransaction.type==="Cash-out"){
        //     setNewTransaction(newTransaction=>({...newTransaction, motive: "Shopping"}))
        // }
    }

    // DEFAULT TRANSACTION MOTIVES

    useEffect(()=>{
        if(newTransaction.type==="Cash-in"){
            setNewTransaction(newTransaction=>({...newTransaction, motive:"Salary"}))
        }else
            {
            setNewTransaction(newTransaction=>({...newTransaction, motive: "Shopping"}))
        }
    }, [newTransaction.type])

    const handleSubmit = (e)=>{
        // const updatedTransactions = [...transactions, {
                
        //         // id: transactions.length === 0? 1 : (transactions.length + 1),
        //         id: crypto.randomUUID(),
        //         type: type,
        //         amount: parseInt(amount),
        //         motive: motive,
        //         date: date,
        //     },];
        e.preventDefault();
        
        const updatedTransactions = [...transactions, newTransaction];
        setTransactions(updatedTransactions);
            if(newTransaction.amount===0){
                alert('Please enter amount')
            }else if(newTransaction.type === "Cash-out" && newTransaction.amount >= parseInt(targetWallet.accountBalance)-parseInt(targetWallet.minBalance)){
                alert("Can't afford this this item. ")
            }else if(newTransaction.type==='Cash-in'){
                targetWallet.accountBalance+= parseInt(newTransaction.amount);
                targetWallet.revenues.push(newTransaction)
                localStorage.setItem('wallets', JSON.stringify(wallets));
                localStorage.setItem('transactions', JSON.stringify(transactions));
                alert("Transaction completed!")
                alert(`Wallet: "${targetWallet.title}" was successfully recharged with ${newTransaction.amount} FCFA`);
            }

            else {
                targetWallet.accountBalance-= parseInt(newTransaction.amount);
                targetWallet.expenses.push(newTransaction)
                localStorage.setItem('wallets', JSON.stringify(wallets));
                localStorage.setItem('transactions', JSON.stringify(transactions));
                alert("Transaction completed!")
                alert(`Wallet: "${targetWallet.title}" was successfully debited with ${newTransaction.amount} FCFA`);
                setNewTransaction(newTransaction);                
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
                        onClick={handleSubmit}
                        variant="outlined"
                        style={{textTransform: 'none'}}
                        >
                    <PostAdd/>Submit
                </Button>
            </Box>
        </>
    )
}

export default AddTransaction
