import React, { useEffect, useState } from 'react'
import {Box} from '@mui/material';
import RHFSelect from '../../utils/formControls/RHFSelect';
import {useForm, FormProvider} from 'react-hook-form';
import {useWallet} from '../../contexts/WalletContext';
import { useAuth } from '../../contexts/AuthContext';

export default function ActiveWalletSelect({wallet}) {
    const {wallets, activeWalletID, activeWallet} = useWallet();
    const{switchActiveWallet} = useAuth();
    const methods = useForm({mode: 'onChange', defaultValues: {currentWallet: wallet?.id ?? ''}});

    const onSubmit = ()=>{
        const selected = methods.getValues('currentWallet')
        if (!selected) return
        if (typeof switchActiveWallet === 'function') {
            switchActiveWallet(selected);
        }
    }
    // useEffect(()=>{
    //     console.log('Selected:', selected)
    // }, [selected])
    return (
        <Box>
            <FormProvider {...methods}>
                <form>
                    <RHFSelect 
                            handleSubmit={methods.handleSubmit}
                            onSubmit={onSubmit}
                            name='currentWallet' 
                            label='Switch Wallets' 
                            options={wallets}
                            placeholder='Switch Wallets'
                            rules={{required: 'Please select a wallet'}}
                        />
                </form>
            </FormProvider>
        </Box>
    )
}
