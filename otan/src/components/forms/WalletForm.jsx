import React from 'react';

import {Box, Container, TextField, Select, InputLabel, MenuItem, FormControl, InputAdornment, Input, FilledInput, OutlinedInput, Button, Typography, Card, CardHeader, CardContent, Tooltip, CardActionArea} from '@mui/material';

import {SaveAs, CancelOutlined, DeleteOutline, Edit, AddCardOutlined, WalletOutlined, AttachMoneyOutlined, InfoOutline} from '@mui/icons-material';
import Modal from '../modal/Modal';

import {useForm, useFormContext} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import { walletSchema } from './FormSchema';
import RHFAutocomplete from './form-controls/RHFAutocomplete';
import MyContainer from '../layouts/MyContainer';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: '#cfe8fc',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const WalletForm = ({initialData, onSubmit, onClose, editMode, resetEditMode}) => {

	const {register, control, formState: {errors,isSubmitting, isSubmitted}} = useFormContext();

	// Show errors if any
    if (Object.keys(errors).length > 0) {
        return (
            <pre>{JSON.stringify(errors, null, 2)}</pre>
        );
    }
    return (
        <>
					<Box component="form" onSubmit={onSubmit}>
				<Typography variant="h4" gutterBottom>
					{editMode? 'Edit Wallet Details' : 'Create a New Wallet'}
				</Typography>

				<TextField {...register('title')}
					fullWidth
					margin='normal'
					label='Wallet title'
					error={!!errors.title}
					helperText={errors.title?.message}
				/>

				<TextField {...register('accountType')}
					label="Account Type"
					fullWidth
					margin='normal'
					error={!!errors.accountType}
					helperText={errors.accountType?.message}
				/>

				<TextField {...register('minBalance')}
					label="Min Balance"
					type="number"
					fullWidth
					margin='normal'
					error={!!errors.minBalance}
					helperText={errors.minBalance?.message}
				/>

				<TextField {...register('monthlyLimit')}
					label="Monthly Limit"
					type="number"
					fullWidth
					margin='normal'
					error={!!errors.monthlyLimit}
					helperText={errors.monthlyLimit?.message}
				/>
				<Button onClick={()=>{onClose(); resetEditMode();}} variant="outlined" sx={{marginRight: 5}}>Cancel</Button>
				<Button type="submit" variant="outlined" >{editMode? 'Save Changes' : 'Create Wallet'}</Button>
			</Box>
			


				{/* <RHFAutocomplete name='states' label='states' choices={[{id:1, label: 'Depo'}, {id:2, label: 'Withdra'}]}/> */}
				
			

			{/* <Box
			component="form"
			// sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
			sx={style}
			noValidate
			autoComplete="off"
		>
			<Box className="create-wallet-form">
				<Typography variant="h5" gutterBottom>
					Create a new wallet:
				</Typography>

                <FormControl sx={{ m: 1 }}>
					<InputLabel id="account-type">Account type</InputLabel>
					<Select
					labelId="select-account"
					id="select-account"
					value={formDetails.accountType}
					label="Account type"
					name="accountType"
					onChange={handleChange}
					inputProps={{name:"accountType"}}
					>
					<MenuItem value="Current account">Current account</MenuItem>
					<MenuItem value="Savings account">Savings account</MenuItem>
					</Select>
				</FormControl>

				<FormControl sx={{ m: 1 }}>
					<InputLabel 
					htmlFor = "title"
					id="wallet-title">Title</InputLabel>
                    <OutlinedInput 
                    required={true}
                    id="wallet-title"
					// label='Title'
                    label="Title"
					name="title"
					value={formDetails.title}
					type='string'
                    onChange={handleChange}
                    placeholder="Enter a title for this wallet"
                />
                </FormControl> 

				<FormControl sx={{ m: 1 }}>
					<InputLabel  htmlFor="minimum balance">Min Balance</InputLabel>
					<OutlinedInput
						id="filled-adornment-amount"
						value={formDetails.minBalance}
						name="minBalance"
						onChange={onChange}
						label="Min Balance"
						type='number'
						startAdornment={<InputAdornment position="start">{formDetails.accountCurrency}</InputAdornment>}
					/>
				</FormControl>
				
				<FormControl sx={{ m: 1 }}>
					<InputLabel  htmlFor="monthly-limit">Monthly Limit</InputLabel>
					<OutlinedInput
						id="filled-adornment-amount"
						label="Monthly Limit"
						value={formDetails.monthlyLimit}
						name="monthlyLimit"
						type='number'
						onChange={onChange}
						startAdornment={<InputAdornment position="start">{formDetails.accountCurrency}</InputAdornment>}
					/>
				</FormControl>
				<Box>
					<Button 
						onClick={onClose}
						variant="outlined"
						style={{textTransform: 'none'}}
						>
					<CancelOutlined/>Cancel
				</Button>

				<Button 
						type='submit'
						onClick={onSave}
						variant="outlined"
						style={{textTransform: 'none'}}
						>
					<SaveAs/>Create wallet
				</Button>
				</Box>
			</Box>
		</Box> */}
		</>
    )
}

export default WalletForm



