import { 
    Box, 
    Container, 
    Typography, 
    Paper, Stack,
    Button, } from '@mui/material'
import { useWallet} from '../contexts/WalletContext'
import WalletsCard from '../components/wallet/WalletCard';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import AppModal from '../components/global/AppModal';
import ActiveWalletSelect from '../components/wallet/ActiveWalletSelect';
import WalletActions from '../components/wallet/WalletActions';
import FundingAccActions, { HubTopUpAction } from '../components/global/FundingAccActions';
import { FundingProvider, useFunding } from '../contexts/FundingAccContext';
import UserAvatar from '../components/user/UserAvatar';
import { useEffect, useState } from 'react';
import { BankIcon } from '@phosphor-icons/react';
import { BorderStyle } from '@mui/icons-material';
import GridContainer from '../components/user/GridContainer';


export default function HomePage() {
    const {accBalance, handleTopUpNCashOut} = useFunding();
    const {wallets, activeWalletID, refreshData, switchActiveWallet} = useWallet();
    const activeWallet = JSON.parse(localStorage.getItem('activeWallet')) || wallets.find((w)=>w.id===activeWalletID)
    
    return (
        <Container sx={{height: '98dvh', mt:8}}>
            <Stack direction={'column'}  pb={2} spacing={2}>
                
                <Stack direction={'column'}>
                    <Stack direction={'row'}  border={'solid 2px #eda113ff'}
                    borderRadius={2}
                    spacing={2}
                    sx={{ bgcolor: 'whitesmoke', pt: 1}}
                    color={'gray'}
                    pl={2}
                    mt={2}
                    >
                        <Box flexGrow={1}>
                            <HubTopUpAction/>
                        </Box>
                        <Box>
                            <FundingAccActions/>
                        </Box>
                        
                    </Stack>
                    
                </Stack>

                </Stack>
            <Stack position={'relative'}>
                <Stack spacing={2}>
                    <WalletsCard wallet = {activeWallet}/>
                    <WalletActions wallet={activeWallet}/>
                    <ActiveWalletSelect wallet = {activeWallet}/>
                    {/* <Box mt={1} >
                        <Chip 
                        variant='filled' 
                        color='warning' 
                        label={activeWallet.note}/>
                    </Box> */}
                </Stack>
            </Stack>
            <GridContainer/>
            
        </Container>
    )
};
