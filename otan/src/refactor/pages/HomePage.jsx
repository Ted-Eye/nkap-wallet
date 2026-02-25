import { 
    Box, 
    Container, 
    Typography, 
    Paper, Stack,
    Button,
    } from '@mui/material'
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
import MyGridContainer, {GridItem} from '../components/user/GridContainer';
import { useAuth } from '../contexts/AuthContext';
import { toLowerCase } from 'zod';
import HomeLayout from '../layout/HomeLayout';
import { BoldText, SubHeading, SubHeading2 } from '../components/global/typography/Typo';
import MyContainer from '../../components/layouts/MyContainer';
import { AlertComponent, Success } from '../components/global/alerts';



export default function HomePage() {
    const {accBalance, handleTopUpNCashOut} = useFunding();
    const {user, logOut, isAuth, funding, wallets, activeWalletID, prefs} = useAuth();
    const {walletMsg, showAlert} = useWallet()
    
    const username = user?.username || 'Guest';

    const activeWallet = wallets?.find((w)=>w.id===activeWalletID);
    const [alertMsg, setAlertMsg] = useState('')

    
    useEffect(()=>{
        if(walletMsg==='success') {
            setAlertMsg("Transaction completed successfully!")
        } else if(walletMsg==='failed') {
            setAlertMsg("Transaction failed!")
        }
    }, [walletMsg])
    console.log(showAlert, walletMsg)
    return (
        <Container sx={{mt:6, position: 'relative', height: '100dvh'}}>
            <Stack direction={'column'}  pb={2} spacing={2} position={'relative'}>
                {isAuth&& 
                    <Typography
                    fontSize={16}
                    textAlign={'left'}
                    sx={{position: 'absolute', top: 22, left: 1, color: '#0a0909ff', bgcolor: '#eda113ff', padding: '2px 6px', 
                        border: 'solid 2px #048021ff',
                        borderBottom: 0,
                        borderRadius: 3.5, textTransform: toLowerCase, zIndex: 1}}
                    >
                    {`@_${username}.affair`} 
                </Typography>
                }
                <Stack direction={'column'}>
                    <Stack direction={'row'}  border={'solid 2px #eda113ff'}
                    borderRadius={2}
                    spacing={2}
                    sx={{ bgcolor: 'whitesmoke', pt: 1}}
                    color={'gray'}
                    pl={2}
                    mt={4}
                    >
                        
                        <Box flexGrow={1}>
                            <HubTopUpAction wallet={funding}/>
                        </Box>
                        <Box>
                            <FundingAccActions wallet={funding}/>
                        </Box>
                        
                    </Stack>
                    
                </Stack>
                    {/* {
                        walletMsg && <Success message={alertMsg}/>
                    } */}
                    
                </Stack>
            <Stack position={'relative'}>
                <Stack spacing={2}>
                    <AlertComponent/>
                    <WalletsCard wallet = {activeWallet}/>
                    <WalletActions wallet={activeWallet}/>
                    <ActiveWalletSelect 
                    wallet = {activeWallet}/>
                    {/* <Box mt={1} >
                        <Chip 
                        variant='filled' 
                        color='warning' 
                        label={activeWallet.note}/>
                    </Box> */}
                </Stack>
            </Stack>
            {
                    
                }
            <MyGridContainer>
                <GridItem>
                    <BoldText text="Marketplace"/>
                </GridItem>
                <GridItem>
                    <BoldText text="My business"/>
                </GridItem>
                <GridItem>
                    <BoldText text={`"Njangi" `}/>
                </GridItem>
                <GridItem>
                    <BoldText text="Virtual cards"/>
                </GridItem>
                <GridItem>
                    <BoldText text="My budgets"/>
                </GridItem>
                <GridItem>
                    <BoldText text="Fundraiser"/>
                </GridItem>
            </MyGridContainer>
        </Container>
    )
};
