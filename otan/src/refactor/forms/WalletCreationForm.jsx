import React from 'react'
import {walletSchema, walletDefaultValues} from '../schemas/WalletSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useWallet } from '../contexts/WalletContext';
import {MODAL_TYPES} from '../../refactor/lib/konstants/Defaults'
import {
    TextField,
    Button,
    Box,
    Typography
} from '@mui/material'
import { useModal } from '../contexts/ModalContext';

const WalletCreationForm = ({handleCloseModal}) => {
    const {mode, modalType, modalData} = useModal();
    const {wallets, addWallet, updateWallet} = useWallet()
    // const methods = useForm({
    //     resolver: zodResolver(walletSchema),
    //     defaultValues: walletDefaultValues
    // });
    const {register, handleSubmit, control, getValues, formState: {errors, isSubmitting}} = useForm({
        resolver: zodResolver(walletSchema),
        defaultValues: walletDefaultValues
    })
    
    const handleFormSubmit = handleSubmit((data)=>{
        console.log('Submitting', data)
    })
    const methods = {register, handleSubmit, control, getValues, formState}
    return (
        <FormProvider {...methods}>
            <Box component="form" onSubmit={onSubmit}>
                            <Typography variant="h4" gutterBottom>
                                {mode===MODAL_TYPES.modes.editWallet? 'Edit Wallet Details' : 'Create a New Wallet'}
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
                            <Button onClick={handleCloseModal} variant="outlined" sx={{marginRight: 5}}>Cancel</Button>
                            <Button type="submit" variant="outlined" >{mode===MODAL_TYPES.modes.editWallet? 'Save Changes' : 'Create Wallet'}</Button>
                        </Box>
        </FormProvider>
    )
}

export default WalletCreationForm
