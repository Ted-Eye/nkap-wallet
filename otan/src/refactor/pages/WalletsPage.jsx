import { Box, Typography, Button, Stack, Grid, Container } from '@mui/material'
import { useWallet } from '../contexts/WalletContext'
import {Link} from 'react-router-dom'
import WalletsCard from '../components/wallet/WalletCard';
import { useModal} from '../../refactor/contexts/ModalContext';
import {MODAL_TYPES} from '../lib/konstants/Defaults';
import {walletDefaultValues} from '../../refactor/schemas/WalletSchema'
import WalletCreationForm from '../forms/WalletCreationForm';
import { useEffect } from 'react';
import { DeleteWalletAction, EditWalletAction } from '../components/wallet/WalletActions';
import { useAuth } from '../contexts/AuthContext';
import ActionAccordion from '../components/global/ActionAccordion';
export default function WalletsPage() {
    const {wallets, getWallets, loading} = useAuth();
    const {handleOpenModal} = useModal();
    const payLoad = walletDefaultValues;
    
    // useEffect(()=>{
    //     getWallets()
    // }, [])
    
    return (
        <Container mt={8} sx={{pb: '84px', pt: '64px'}}>
            {
                loading&& <Container>Loading</Container>
            }
            <Stack direction={'row'} spacing={2} padding={2}>
                <Typography >
                {
                    `All wallets: ${wallets?.length}`
                }
            </Typography>
            <Button 
            onClick={()=> handleOpenModal(MODAL_TYPES.w, MODAL_TYPES.modes.newWallet, payLoad)}
            variant='outlined'>
                New wallet
            </Button>
            </Stack>
            <Grid bgcolor={'#b6b2aaff'}>
                {
                    wallets&& wallets.map((wallet, id)=>
                    <Box key={id}>
                        <ActionAccordion wallet={wallet} id={id}>
                            <WalletsCard wallet={wallet}/>
                        </ActionAccordion>
                    </Box>)
                }
            </Grid>  
        </Container>
    )
};