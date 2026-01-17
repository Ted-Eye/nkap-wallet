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
    Typography,
    Container
} from '@mui/material'
import { useModal } from '../contexts/ModalContext';

const WalletCreationForm = ({payLoad,  handleCloseModal}) => {
    const {mode, modalType, modalData} = useModal();
    const {wallets, addWallet, editWallet} = useWallet()

    const {register, handleSubmit, control, getValues, formState: {errors, isSubmitting, isSubmitSuccessful}} = useForm({
        resolver: zodResolver(walletSchema),
        defaultValues: modalData
    })
    
    const onSubmit = (data)=>{
        if(mode===MODAL_TYPES.modes.editWallet){
            editWallet(data);
            handleCloseModal()
        }
        else {
            addWallet(data)
        handleCloseModal()
        }
    };

    const methods = {register, handleSubmit, control, errors, isSubmitting}

    // if (Object.keys(errors).length > 0) {
    //     return (
    //         <pre>{JSON.stringify(errors, null, 2)}</pre>
    //     );
    // }
    return (
        <FormProvider {...methods}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                            <Container>
                                <Typography variant="h6" gutterBottom>
                                {mode===MODAL_TYPES.modes.editWallet? 'Edit Wallet Details' : 'Create a New Wallet'}
                            </Typography>
                                {
                                    mode===MODAL_TYPES.modes.newWallet? 
                                    <TextField {...register('title')}
                                fullWidth
                                margin='normal'
                                label='Wallet title'
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />           
                            : (
                                <>
                                    <TextField {...register('title')}
                                fullWidth
                                margin='normal'
                                label='Wallet title'
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                            <TextField {...register('monthlyLimit', {valueAsNumber: true})}
                                fullWidth
                                margin='normal'
                                label='Monthly spending limit'
                                error={!!errors.monthlyLimit}
                                helperText={errors.monthlyLimit?.message}
                            /> 
                            <TextField {...register('minBalance', {valueAsNumber: true})}
                                fullWidth
                                margin='normal'
                                label='Minimum balance'
                                error={!!errors.minBalance}
                                helperText={errors.minBalance?.message}
                            />      
                                </>
                            )
                                }
                            <Button onClick={handleCloseModal} variant="outlined" sx={{marginRight: 5}}>Cancel</Button>
                            <Button type="submit" variant="outlined" >{mode===MODAL_TYPES.modes.editWallet? 'Save Changes' : 'Create Wallet'}</Button>
                            </Container>
                        </Box>
        </FormProvider>
    )
}

export default WalletCreationForm;
