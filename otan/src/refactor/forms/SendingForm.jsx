import React from 'react'
import {
    TextField,
    Button,
    Box,
    Typography
} from '@mui/material'
import { useModal } from '../contexts/ModalContext';

import {zodResolver} from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useWallet } from '../contexts/WalletContext';
import {EXPENSE_CATEGORIES, MODAL_TYPES} from '../../refactor/lib/konstants/Defaults';
import {transactionSchema} from '../schemas/TransactionSchema'

const motives = EXPENSE_CATEGORIES

export default function SendingForm({payLoad, handleCloseModal}) {
    const {register, handleSubmit, control, getValues, formState: {errors, isSubmitting}} = useForm({
            resolver: zodResolver(transactionSchema),
            defaultValues: payLoad
        })
    const methods = {
        register, handleSubmit, control, getValues, errors, isSubmitting
    }
    const onSubmit = (data)=>{
        console.log('Submitting', data);
        handleCloseModal()
    }
    // console.log(payLoad)
    return (
        <FormProvider {...methods}>
            <Box component="form" 
            onSubmit={handleSubmit(onSubmit)} 
            sx={{ p: 6,  
            boxShadow: 24,}}>
                            <Typography variant="h4" gutterBottom>
                            Send Money
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
                            <Button onClick={handleCloseModal} variant="outlined" sx={{marginRight: 5}}>Cancel</Button>
                            <Button type="submit" variant="outlined" >Submit</Button>
                        </Box>
        </FormProvider>
    )
}
