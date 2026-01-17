import { Box, Typography, Button, Stack, Grid } from '@mui/material'
import { useWallet } from '../contexts/WalletContext'
import {Link} from 'react-router-dom'
import WalletsCard from '../components/wallet/WalletCard';
import { useModal} from '../../refactor/contexts/ModalContext';
import {MODAL_TYPES} from '../lib/konstants/Defaults';
import {walletDefaultValues} from '../../refactor/schemas/WalletSchema'
import WalletCreationForm from '../forms/WalletCreationForm';
import { useEffect } from 'react';
import { DeleteWalletAction, EditWalletAction } from '../components/wallet/WalletActions';
export default function WalletsPage() {
    const {wallets} = useWallet();
    const {handleOpenModal} = useModal();
    const payLoad = walletDefaultValues;
    
    return (
        <Box>
            <Stack direction={'row'} spacing={2} padding={2}>
                <Typography variant='p'>
                {
                    `All wallets: ${wallets?.length}`
                }
            </Typography>
            <Button 
            onClick={()=> handleOpenModal(MODAL_TYPES.w, MODAL_TYPES.modes.newWallet, {...payLoad, id: crypto.randomUUID()})}
            variant='outlined'>
                New wallet
            </Button>
            </Stack>
            <Grid>
                {
                    wallets.map((wallet, id)=>
                    <Box key={id}>
                        <WalletsCard wallet={wallet}/>
                        <Link 
                        key={id} to={`/wallets/${wallet.title}`}>
                        Details
                        </Link>
                        <EditWalletAction wallet={wallet}/>
                        <DeleteWalletAction wallet={wallet}/>
                    </Box>)
                }
            </Grid>  
        </Box>
    )
};