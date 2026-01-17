import React from 'react'
import {useFormContext, Controller } from 'react-hook-form';
import { Select, MenuItem, FormHelperText, FormControl, InputLabel, Button } from '@mui/material';
import { object } from 'zod';

export default function RHFSelect({name, label, options={}, rules, placeholder, onSubmit, handleSubmit}) {
    const { control} = useFormContext();

    return (
        <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState}) => (
                        <FormControl 
                        fullWidth error={!!fieldState.error}>
                            <InputLabel >{label}</InputLabel>
                            <Select {...field}  label={label}
                            value={field.value || ''}
                            onChange={(e)=>field.onChange(e.target.value)}
                            // placeholder={placeholder}
                            displayEmpty>
                                <MenuItem value="" disabled>
                                    {placeholder}
                                </MenuItem>
                                {
                                    options.map((opt)=>(<MenuItem key={opt.id} value={opt.id} onClick={handleSubmit(onSubmit)}
                                    >{opt.title}</MenuItem>))
                                }
                            </Select>
                            {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
                        </FormControl>
                    )}
                />
    )
}

                