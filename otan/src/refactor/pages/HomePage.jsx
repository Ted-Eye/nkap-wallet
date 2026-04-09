import { 
    Box, 
    Container, 
    Typography, 
    Paper, Stack,
    Button,
    } from '@mui/material'
import WalletsCard from '../components/wallet/WalletCard';
import ActiveWalletSelect from '../components/wallet/ActiveWalletSelect';
import WalletActions from '../components/wallet/WalletActions';
import FundingAccActions, { HubTopUpAction } from '../components/global/FundingAccActions';
import { useFunding } from '../contexts/FundingAccContext';
import { use, useEffect, useState } from 'react';
import { BankIcon, CoinsIcon, CreditCardIcon, PiggyBankIcon, ShoppingCartIcon, StorefrontIcon, UsersThreeIcon, VaultIcon, WalletIcon } from '@phosphor-icons/react';
import MyGridContainer, {GridItem} from '../components/user/GridContainer';
import { useAuth } from '../contexts/AuthContext';
import { toLowerCase } from 'zod';
import HomeLayout from '../layout/HomeLayout';
import { BoldText, SubHeading, SubHeading2 } from '../components/global/typography/Typo';




export default function HomePage() {
    const {accBalance, handleTopUpNCashOut} = useFunding();
    const {user, logOut, isAuth, funding, wallets, activeWalletID, prefs} = useAuth();
    
    const username = user?.username || 'Guest';
    const activeWallet = wallets?.find((w)=>w.id===activeWalletID);
    const offers = [
        {title: 'Marketplace', icon: <ShoppingCartIcon size={32} color='#eda113ff'/>},
        {title: 'My business', icon: <StorefrontIcon size={32} color='#eda113ff'/>},
        {title: `Njangi`, icon: <UsersThreeIcon size={32} color='#eda113ff'/>},
        {title: 'Cards', icon: <CreditCardIcon size={32} color='#eda113ff'/>},
        {title: 'Budgets', icon: <WalletIcon size={32} color='#eda113ff'/>},
        {title: 'Fundraiser', icon: <PiggyBankIcon size={32} color='#eda113ff'/>},
        {title: 'Daily savings', icon: <VaultIcon size={32} color='#eda113ff'/>},
        {title: 'Investments', icon: <CoinsIcon size={32} color='#eda113ff'/>},
    ]

    
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
                    {/* <AlertComponent/> */}
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
                {offers.map((offer, index)=>(
                    <GridItem key={index}>
                        <Box display={'flex'}  alignItems={'center'} flexDirection={'row'} gap={1} my={2} justifyContent={'space-around'}> 
                            {offer.icon}
                            <BoldText text={offer.title}/>
                        </Box>
                        
                    </GridItem>
                ))}
            </MyGridContainer>
        </Container>
    )
};
