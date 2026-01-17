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
import {MODAL_TYPES} from '../../refactor/lib/konstants/Defaults';
import {transactionSchema} from '../schemas/TransactionSchema';

export default function ReceivingForm({payLoad, handleCloseModal}) {
    const {register, handleSubmit, control, getValues, formState: {errors, isSubmitting}} = useForm({
                resolver: zodResolver(transactionSchema),
                defaultValues: payLoad
            })
    const methods = {
        register, handleSubmit, control, getValues, errors, isSubmitting
    };
    
    const onSubmit = (data)=>{
        console.log('Submitting', data);
        handleCloseModal()
    }

    if (Object.keys(errors).length > 0) {
        return (
            <pre>{JSON.stringify(errors, null, 2)}</pre>
        );
    }
    
    return (
        <FormProvider {...methods}>
            <Box 
                component="form" 
                onSubmit={handleSubmit(onSubmit)} 
                sx={{ p: 4, 
                    bgcolor: '#cfe8fc', 
                    border: '2px solid #000', 
                    boxShadow: 24,}}>
                <Typography variant="h4" gutterBottom>
                    Recharge wallet
                </Typography>
                    <TextField {...register('amount', {valueAsNumber: true})} 
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
                    <Button 
                    onClick={handleCloseModal} 
                    variant="outlined" 
                    sx={{marginRight: 5}}>Cancel</Button>
                    <Button 
                    type="submit" 
                    variant="outlined">Submit</Button>
            </Box>
        </FormProvider>
    )
}
