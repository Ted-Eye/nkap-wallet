import { useEffect, useState } from "react";

import {Box, TextField, Select, InputLabel, MenuItem, FormControl, InputAdornment, Input, FilledInput, OutlinedInput, Button, Typography} from '@mui/material';

import {SaveAs, CancelOutlined} from '@mui/icons-material'




const Preferences = ({onSave}) => {
    


    const [prefs, setPrefs] =  useState(()=>{
        return JSON.parse(localStorage.getItem('settings')) || {language: 'English', currency: 'FCFA', theme: 'White'}
    })

    // SINGLE FUNCTION TO HANDLE CHANGE IN ALL INPUT FIELDS
    const handleChange = (e)=>{
        setPrefs({...prefs, [e.target.name]: e.target.value})
    }
    
    const handleSavePrefs = (e)=>{
        e.preventDefault()
        localStorage.setItem('settings', JSON.stringify(prefs))

    }
    
    const handleSave = (e)=>{
        e.preventDefault()
        onSave(prefs)

    }

    const getPrefs = ()=>{
        const storedPrefs = JSON.parse(localStorage.getItem('settings'))
        setPrefs(storedPrefs)
    }

    useEffect(()=>{
        localStorage.setItem('settings', JSON.stringify(prefs))
    },[])

    return (
        <>
        {/* PREFERENCES DISPLAY */}
        <div>
            <h1>
                Preferences
            </h1>
        </div>
        <div>
            <p>Currency: {prefs.currency}</p>
            <p>Language: {prefs.language}</p>
            <p>Theme: {prefs.theme}</p>
        </div>

        {/* MODAL TO UPDATE PREFERENCES */}

        {/* <Box 
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <div color="white">
                <Typography variant="h5" gutterBottom>
                    Update Preferences:
                </Typography>
                <FormControl sx={{ m: 1 }}>
                    <InputLabel id="currency">Currency</InputLabel>
                    <Select
                    labelId="select-currency"
                    id="select-currency"
                    value={prefs.currency}
                    label="Currency"
                    name="currency"
                    onChange={handleChange}
                    >
                    <MenuItem value="FCFA">CFA Franc</MenuItem>
                    <MenuItem value="USD">US Dolla</MenuItem>
                    <MenuItem value="GBP">British Pound</MenuItem>
                    <MenuItem value="EUR">Euro</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1}}>
                    <InputLabel  htmlFor="minimum balance">Min Balance</InputLabel>
                    <OutlinedInput
                        id="filled-adornment-amount"
                        value={prefs.marginalBalance}
                        name="marginalBalance"
                        onChange={handleChange}
                        label="Min Balance"
                        startAdornment={<InputAdornment position="start">{prefs.currency}</InputAdornment>}
                    />
                </FormControl>
                
                <FormControl sx={{ m: 1 }}>
                    <InputLabel  htmlFor="minimum balance">Monthly Limit</InputLabel>
                    <OutlinedInput
                        id="filled-adornment-amount"
                        label="Monthly Limit"
                        value={prefs.monthlyLimit}
                        name="monthlyLimit"
                        onChange={handleChange}
                        startAdornment={<InputAdornment position="start">{prefs.currency}</InputAdornment>}
                    />
                </FormControl>
                </div>
                <Button 
                        variant="outlined"
                        style={{textTransform: 'none'}}
                        >
                    <CancelOutlined/>Cancel
                </Button>
                <Button 
                        onClick={handleSave}
                        variant="outlined"
                        style={{textTransform: 'none'}}
                        >
                    <SaveAs/>Save
                </Button>
        </Box> */}
        </>
    )
}

export default Preferences