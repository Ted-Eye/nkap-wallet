import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { usePrefs } from '../contexts/PrefsContext'
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultSettings } from '../schemas/settingsSchema';
import RHFSelect from '../utils/formControls/RHFSelect';
import { CURRENCIES, LANGUAGES, APP_MODES, THEMES } from '../lib/konstants/Defaults';
import SelectField from '../utils/formControls/SelectField';


export default function SettingsPage() {
    const methods = useForm({
        resolver: zodResolver,
        defaultValues: defaultSettings
    })
    const errors = methods.formState.errors
    const {prefs, updatePrefs, onChangePrefs} = usePrefs();
    const handleChange = (e) => {
        onChangePrefs(e);
    }
    const onSubmit = (data) => {
        console.log('updating', data)
    }
    
    

    // console.log(prefs)
    return (
        <Box p={6}>
            <Typography variant='h6'>
                Settings
            </Typography>

                <FormProvider {...methods}>
                    <form>
                        <Stack spacing={2} mb={4} mt={4} direction={'row'} alignItems={'center'}>
                            <Typography variant='h6' sx={{minWidth: 120}}>
                            Currency:
                        </Typography>
                        <SelectField 
                        // label='Currency'
                        name='currency'
                        value={prefs.currency}
                        onChange={handleChange}
                        options={CURRENCIES}
                        />
                        </Stack>

                        <Stack spacing={2} mb={4} mt={4} direction={'row'} alignItems={'center'}>
                            <Typography variant='h6' sx={{minWidth: 120}}>
                            Language:
                        </Typography>
                        <SelectField 
                        // label='Currency'
                        name='language'
                        value={prefs.language}
                        onChange={handleChange}
                        options={LANGUAGES}
                        />
                        </Stack>

                        <Stack spacing={2} mb={4} mt={4} direction={'row'} alignItems={'center'}>
                            <Typography variant='h6' sx={{minWidth: 120}}>
                            Useer mode:
                        </Typography>
                        <SelectField 
                        // label='Currency'
                        name='mode'
                        value={prefs.mode}
                        onChange={handleChange}
                        options={APP_MODES}
                        />
                        </Stack>
                        {/* <RHFSelect 
                                handleSubmit={methods.handleSubmit}
                                onSubmit={onSubmit}
                                name='currency' 
                                label='Currency' 
                                options={CURRENCIES}
                                placeholder='Currency'
                                rules={{required: 'Please select a currency'}}
                            /> */}
                    </form>
                </FormProvider>
            
            {/* <Paper>
                <Typography width={'80%'}>
                    Shiped with love, from Yaounde
                </Typography>
            </Paper> */}
        </Box>
    )
};