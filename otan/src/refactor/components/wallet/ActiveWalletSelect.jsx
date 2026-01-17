import React, { useEffect, useState } from 'react'
import {Box} from '@mui/material';
import RHFSelect from '../../utils/formControls/RHFSelect';
import {useForm, FormProvider} from 'react-hook-form';
import {useWallet} from '../../contexts/WalletContext'
export default function ActiveWalletSelect({wallet}) {
    const {wallets, activeWalletID, activeWallet, switchActiveWallet} = useWallet();
    const methods = useForm({mode: 'onChange', defaultValues: {currentWallet: wallet.id}});

    
    const onSubmit = ()=>{
        switchActiveWallet(methods.getValues('currentWallet'));
        // console.log(methods.getValues('currentWallet'))
        // console.log(activeWallet)
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
