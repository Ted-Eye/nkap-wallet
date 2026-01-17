import { Box, Button, Container, FormControl, Typography, Paper, Stack, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RHFSelect from '../utils/formControls/RHFSelect'
import { useForm, FormProvider, Watch } from 'react-hook-form'
import { useWallet, WalletProvider } from '../contexts/WalletContext'
import WalletsCard from '../components/wallet/WalletCard';
import Chip from '@mui/material/Chip';
import WalletActions from '../components/wallet/WalletActions'
import HomeLayout from '../layout/HomeLayout';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SavingsIcon from '@mui/icons-material/Savings';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Avatar from '@mui/material/Avatar';


import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppModal from '../components/global/AppModal'


export default function HomePage() {
    const {wallets} = useWallet();
    const [activeWalletID, setActiveWalletID] = useState(wallets[0]?.id || null);
    const [activeWallet, setActiveWallet] = useState(wallets.find((w)=>w.id===activeWalletID))
    
    const methods = useForm({mode: 'onChange', defaultValues: {currentWallet: ''}});
    const switchActiveWallet = (id)=>{
        setActiveWalletID(id)
    }

    const onSubmit = ()=>{
        setActiveWalletID(methods.getValues('currentWallet'));
        setActiveWallet(wallets.find((w)=>w.id===methods.getValues('currentWallet')))
    }

    // useEffect(()=>{
        
    // },[onSubmit])
    
    return (

        <Container sx={{height: '100dvh'}}>
            <Typography pt={4}>WizeR</Typography>
            <Stack position={'relative'}>
                <Box mb={-3}>
                    <Stack position='relative' direction='row' spacing={4} mb={4}>
                        <Box>
                            <FormProvider {...methods}>
                                <form>
                                    <RHFSelect 
                                            handleSubmit={methods.handleSubmit}
                                            onSubmit={onSubmit}
                                            name='currentWallet' 
                                            label='Switch Wallets' 
                                            options={wallets}
                                                                                                            placeholder='Switch                         Wallets'
                                            rules={{required: 'Please select a wallet'}}
                                        />
                                </form>
                            </FormProvider>
                        </Box>
                        <Box sx={{position: 'absolute', right: 10}}>
                                <Avatar alt="Ted Eye" src="" />
                                <Typography component='p' fontSize='8px'>@username</Typography>
                            </Box>

                    </Stack>
                </Box>
                <AppModal/>
                <WalletsCard wallet = {activeWallet}/>
                <Box mt={1} >
                    <Chip variant='filled' color='warning' label={activeWallet.note}/>
                </Box>
                <Stack direction={'row'} spacing={1}> 
                    <Paper sx={{bgcolor: '#010714bf', color: 'white', border: 'solid .1px green', borderRadius: '10px'}}>
                    Daily finance devotion.
                    
                </Paper>
                <Paper sx={{bgcolor: '#010714bf', color: 'white', border: 'solid .1px green', borderRadius: '10px'}}>
                    Daily finance devotion.
                </Paper>
                </Stack>
            </Stack>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '56px', pb: 'env(safe-area-inset-bottom'}} elevation={16}>
                <BottomNavigation
                showLabels
                // value={value}
                // onChange={(event, newValue) => {
                //     setValue(newValue);
                // }}
                >
                    <BottomNavigationAction label="Recents" icon={<ReceiptIcon />} />
                    <BottomNavigationAction label="Wallets" icon={<SavingsIcon />} />
                    <BottomNavigationAction label="Njangi" icon={<Diversity3Icon />} />
                    <BottomNavigationAction label="Settings" icon={<ManageAccountsIcon />} />
                    {/* <BottomNavigationAction label="Njangi" icon={<ReceiptIcon />} /> */}
                </BottomNavigation>
            </Paper>
        </Container>


        // <Container sx={{height: '90dvh'}} >
        //     <Typography variant='h6'>
                
        //     </Typography>
        //     <FormProvider {...methods}>
        //         <form>
        //             <Box >
        //                 <RHFSelect 
        //                     handleSubmit={methods.handleSubmit}
        //                     onSubmit={onSubmit}
        //                     name='currentWallet' 
        //                     label='Switch Wallets' 
        //                     options={wallets}
        //                     // placeholder='Switch Wallets'
        //                     rules={{required: 'Please select a wallet'}}
        //                 />
        //             </Box>
        //         </form>
        //     </FormProvider>
        //     <WalletsCard wallet = {activeWallet}/>
        //     <Box mt={2}>
        //             <Chip variant='filled' color='warning' label={activeWallet.note}/>
        //         </Box>
        // </Container>
    )
};
