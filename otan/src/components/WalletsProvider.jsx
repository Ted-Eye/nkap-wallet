import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
// import {defaultValues, walletSchema} from './forms/FormSchema';
import {zodResolver} from '@hookform/resolvers/zod'
import Wallets from '../pages/walletsList/Wallets';
import WalletForm from './forms/WalletForm';


export default function WalletsProvider() {
    const methods = useForm({
        mode: 'all',
        resolver: zodResolver(walletSchema),
        defaultValues,
    })

    return (
        <FormProvider {...methods}>
            {/* <WalletForm/> */}
        </FormProvider>
    )
}
