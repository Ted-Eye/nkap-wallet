import { useEffect, useState } from "react";

import {Box, TextField, Select, InputLabel, MenuItem, FormControl, InputAdornment, Input, FilledInput, OutlinedInput, Button, Typography} from '@mui/material';

import {SaveAs, CancelOutlined} from '@mui/icons-material'




const Preferences = ({transactions, revenues, expenses, getTotal, balance, onSave}) => {
	

	// const [currency, setCurrency] = useState('FCFA');
	// const [marginalBalance, setMarginalBalance] = useState(0);
	// const [purchasingPower, setPurchasingPower] = useState(0);
	// const [monthlyLimit, setMonthlyLimit] = useState(0)
	const [userSettings, setUserSettings] =  useState(()=>{
		return JSON.parse(localStorage.getItem('settings')) || {currency: 'FCFA', marginalBalance: 0, purchasingPower: 0, monthlyLimit: 0}
	})

	// SINGLE FUNCTION TO HANDLE CHANGE IN ALL INPUT FIELDS
	const handleChange = (e)=>{
		setUserSettings({...userSettings, [e.target.name]: e.target.value})
	}
	const handleSave = (e)=>{
		e.preventDefault()
		onSave(userSettings)

	}


	// useEffect(()=>{
	// 	localStorage.setItem('settings', JSON.stringify(userSettings))
	// },[userSettings])
	return (
		<Box 
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
					value={userSettings.currency}
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
						value={userSettings.marginalBalance}
						name="marginalBalance"
						onChange={handleChange}
						label="Min Balance"
						startAdornment={<InputAdornment position="start">{userSettings.currency}</InputAdornment>}
					/>
				</FormControl>
				
				<FormControl sx={{ m: 1 }}>
					<InputLabel  htmlFor="minimum balance">Monthly Limit</InputLabel>
					<OutlinedInput
						id="filled-adornment-amount"
						label="Monthly Limit"
						value={userSettings.monthlyLimit}
						name="monthlyLimit"
						onChange={handleChange}
						startAdornment={<InputAdornment position="start">{userSettings.currency}</InputAdornment>}
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
		</Box>
	
	)
}

export default Preferences
