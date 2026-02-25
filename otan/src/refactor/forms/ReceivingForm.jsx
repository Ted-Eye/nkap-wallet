import React, { useEffect, useState } from 'react'

import {
    TextField,
    Button,
    Box,
    Typography
} from '@mui/material'
import { useModal } from '../contexts/ModalContext';

import {zodResolver} from '@hookform/resolvers/zod';
import { useForm, FormProvider, Controller} from 'react-hook-form';
import { useWallet } from '../contexts/WalletContext';
import {MODAL_TYPES, INCOME_SOURCES} from '../../refactor/lib/konstants/Defaults';
import {transactionSchema} from '../schemas/TransactionSchema';
import SelectField from '../utils/formControls/SelectField';
import { SubHeading, SubHeading2 } from '../components/global/typography/Typo';

const motives = INCOME_SOURCES
export default function ReceivingForm({payLoad, handleCloseModal}) {
    const safePayload = payLoad || {};
    const {register, handleSubmit, control, getValues, formState: {errors, isSubmitting}} = useForm({
                mode: 'onSubmit',
                resolver: zodResolver(transactionSchema),
                defaultValues: safePayload
            })
    const methods = {
        register, handleSubmit, control, getValues, errors, isSubmitting
    };
    // derive a local `loading` flag from the form state to avoid undefined
    const loading = isSubmitting;
    const {activeWallet, handleReceiving, funding, wallets, addTransaction, rechargeWallet} = useWallet()
    const [fundingAcount, setFundingAccount] = useState(false)

    // const wallet = wallets.find((w)=>w.id===payLoad.wallet)
    const [formData, setFormData] = useState(safePayload);
    
    // const handleChange = (e)=>{
    //     console.log(e.target)
    //     const {name, value} = e.target
    //     setFormData((formData) => ({...formData, [name]: value}))
    // }
    // useEffect(()=>{
    //     formData
    // }, [formData])
    const title = safePayload.wallet === funding?.id ? 'Top-up your account' : 'Recharge wallet'

    const onSubmit = (data)=>{
        if(safePayload.wallet === funding?.id) {
            addTransaction(data)
            handleCloseModal()
        } else {
            rechargeWallet(data)
            handleCloseModal()
        }
        // if(data.amount>funding.accountBalance) {
        //     alert('Insufficient balance')
        // } else {rechargeWallet(data)}
        
    }  

    // if (Object.keys(errors).length > 0) {
    //     return (
    //         <pre>{JSON.stringify(errors, null, 2)}</pre>
    //     );
    // }
    
    return (
        <FormProvider {...methods}>
            <Box 
                component="form" 
                onSubmit={handleSubmit(onSubmit)} 
                sx={{ p: 4, 
                    // bgcolor: '#cfe8fc', 
                    boxShadow: 24,}}>
                <SubHeading2 text={title}/>
                    <TextField {...register('amount', {valueAsNumber: true})} 
                                fullWidth
                                margin='normal'
                                label='Transaction Amount' 
                                error={!!errors.amount}
                                helperText={errors.amount?.message}
                                type='number'
                                >
                    </TextField>
                    {
                        safePayload.wallet !== funding?.id && 
                        <Controller
                            name="motive"
                            control={control}
                            rules={{required: 'Please select motive'}}
                            render={({field, fieldState})=>(<SelectField {...field}
                                label='Income source'
                                name='motive'
                                value={field.value ?? safePayload.motive}
                                onChange={(e)=>field.onChange(e.target.value)}
                                options={motives}
                            />)}
                        >
                        </Controller>
                        
                        
                    }
                    
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
