import {
    TextField,
    Button,
    Box,
    Typography
} from '@mui/material'
import { useModal } from '../contexts/ModalContext';

import {zodResolver} from '@hookform/resolvers/zod';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useWallet } from '../contexts/WalletContext';
import {EXPENSE_CATEGORIES, MODAL_TYPES, EXPENSE_MOTIVES} from '../../refactor/lib/konstants/Defaults';
import {transactionSchema} from '../schemas/TransactionSchema'
import SelectField from '../utils/formControls/SelectField';
import { useState } from 'react';
import { SubHeading2 } from '../components/global/typography/Typo';
import { Success } from '../components/global/alerts';

const motives = EXPENSE_MOTIVES

export default function SendingForm({
    payLoad, handleCloseModal}) {
    const safePayload = payLoad || {}
    const {register, handleSubmit, control, getValues, formState: {errors, isSubmitting}} = useForm({
            resolver: zodResolver(transactionSchema),
            defaultValues: safePayload
        });
    
    const methods = {
        register, handleSubmit, control, getValues, errors, isSubmitting
    }
    const {funding, wallets, handleSending, addTransaction, sendMoney} = useWallet()
    const wallet = wallets.find((w)=>w.id===payLoad.walletID);
    const [formData, setFormData] = useState(payLoad);

    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData((formData) => ({...formData, [name]: value}))
    }
    const title = payLoad.wallet===funding.id? 'Withdraw funds': 'Send money'
    const onSubmit = (data)=>{
        if(payLoad.wallet===funding.id){
            addTransaction(data)
            handleCloseModal()
        } else {
            sendMoney(data)
            handleCloseModal()
        }
        // const balance = wallet.accountBalance
        // if(data.amount>balance){
        //     alert('Insufficient balance')
        // }else handleSending(data)
        // handleCloseModal()
        // sendMoney(data)
        // addTransaction(data)
        // console.log(data)
        // handleCloseModal()
    }
    
    // if (Object.keys(errors).length > 0) {
    //     return (
    //         <pre>{JSON.stringify(errors, null, 2)}</pre>
    //     );
    // }
    return (
        <FormProvider {...methods}>
            <Box component="form" 
            onSubmit={handleSubmit(onSubmit)} 
            sx={{ p: 4, 
                    // bgcolor: '#cfe8fc', 
                    boxShadow: 24,}}>
                            
                        <SubHeading2 text={title}/>
                        <TextField {...register('amount')} 
                                        fullWidth
                                        margin='normal'
                                        label='Transaction Amount' 
                                        error={!!errors.amount}
                                        helperText={errors.amount?.message}
                                        type='number'
                                        >
            
                            </TextField>
                            {
                                payLoad.wallet!==funding.id&& 
                                    (<>
                                        <TextField {...register('receiver_name')} 
                                                fullWidth
                                                margin='normal'
                                                label="Receiver's username" 
                                                error={!!errors.receiver_name}
                                                helperText={errors.receiver_name?.message}
                                                >
                                    </TextField>
                                        <Controller
                                            name="motive"
                                            control={control}
                                            rules={{required: 'Please select motive'}}
                                            render={({field, fieldState})=>(<SelectField {...field}
                                                label='Select motive'
                                                name='motive'
                                                value={field.value ?? safePayload.motive}
                                                onChange={(e)=>field.onChange(e.target.value)}
                                                options={motives}
                                            />)} 
                                            />
                                    <TextField {...register('note')} 
                                                fullWidth
                                                margin='normal'
                                                label='Transaction Note' 
                                                error={!!errors.note}
                                                helperText={errors.note?.message}
                                                >
                                    </TextField>
                                </>)
                            }
                            
                            <Button onClick={handleCloseModal} variant="outlined" sx={{marginRight: 5}}>Cancel</Button>
                            <Button type="submit" variant="outlined" >Submit</Button>
                        </Box>
        </FormProvider>
    )
}
