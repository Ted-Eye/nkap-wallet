import React from 'react';
import {Controller, useFormContext } from 'react-hook-form';
import {Autocomplete, TextField} from '@mui/material'
import {choices} from '../../utils/Choices';

export default function RHFAutocomplete({name, label, choices}) {
    const {control} = useFormContext()
    return (
        <>
            <Controller 
                control={control}
                name={name}
                render={({field: {value, onChange, ref}, fieldState: {error}})=>(<Autocomplete 
                    options={choices} 
                    onChange={(_, newValue)=>{onChange(newValue)}}
                    getOptionLabel={(option)=>choices.find((choice)=>choice.id===option.id)?.label ?? ''}
                    value={value.filter((id)=>value.id===id)}
                    renderInput={(params)=><TextField 
                                            {...params} 
                                            fullWidth 
                                            inputRef={ref}
                                            error={!!error}
                                            helperText={error?.message}
                                            label={label}
                                            />}
                    />)
                }
            />
        </>
    )
}
