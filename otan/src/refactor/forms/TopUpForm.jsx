import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { FundingAccDefaults, FundingAccSchema } from '../schemas/FundingAccSchema'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useFunding } from '../contexts/FundingAccContext'

export default function TopUpForm({title, payLoad, handleCloseModal}) {
    // const defaultValues = FundingAccDefaults
    const {handleTopUpNCashOut} = useFunding()
    const {register, handleSubmit, control, getValues, formState: {errors, isSubmitting}} = useForm({
        resolver: zodResolver(FundingAccSchema),
        defaultValues: payLoad
    })
    const methods = {
        register, handleSubmit, control, getValues, errors, isSubmitting
    }
    const onSubmit = (data)=>{
        handleTopUpNCashOut(data)
        handleCloseModal()
    }
    return (
        <FormProvider {...methods}>
            <Box component="form" 
            onSubmit={handleSubmit(onSubmit)} 
            sx={{ p: 2,  
                    boxShadow: 24,}}>
                        <Typography variant="h5" gutterBottom
                            textAlign={'center'}
                            >
                            {title}
                        </Typography>
                        <TextField {...register('amount', {valueAsNumber: true})} 
                                        fullWidth
                                        margin='normal'
                                        label='Amount' 
                                        error={!!errors.amount}
                                        helperText={errors.amount?.message}
                                        type='number'
                                        >
            
                            </TextField>
                            {/* <TextField {...register('note')} 
                                        fullWidth
                                        margin='normal'
                                        label='Transaction Note' 
                                        error={!!errors.note}
                                        helperText={errors.note?.message}
                                        >
                            </TextField> */}
                            <Button onClick={handleCloseModal} variant="outlined" sx={{marginRight: 5}}>Cancel</Button>
                            <Button type="submit" variant="outlined" >Submit</Button>
                        </Box>
        </FormProvider>
    )
}
