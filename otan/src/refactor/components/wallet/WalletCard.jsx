import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Container, Typography,Box, Button, capitalize } from '@mui/material';
import { WalletOutlined } from '@mui/icons-material';
// import { Deposit, Details, RecentTransactions, Withdraw } from '../custom/CustomIcons';
import { FormProvider, useFormContext } from 'react-hook-form';
import {usePrefs} from '../../contexts/PrefsContext'
import {useModal} from '../../contexts/ModalContext'
import LockClockIcon from '@mui/icons-material/LockClock';
import DateRangeIcon from '@mui/icons-material/DateRange';
import WalletActions from './WalletActions';
import WalletFunding from './WalletFunding';
import ActiveWalletSelect from './ActiveWalletSelect';

const DemoPaper = styled(Paper)(({ theme }) => ({
    // width: '98dvw',
    // height: '50%',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    backgroundColor: 'whitesmoke',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: 'solid, 1px, #dbddd2ff'
    })); 

    export default function WalletsCard({ wallet, handleCloseForm, handleOpenForm, toggleEditMode, handleDelete, transactionDefaultValues, defaultValues}) {
    
    const {prefs} = usePrefs()
    return (
        <Box>
            <Stack spacing={1} >
                
                <DemoPaper elevation={16} sx={{borderRadius: '10px'}}>
                <Stack direction={'column'} spacing={2}>
                    <Stack 
                    spacing={1} alignItems="center">
                        <Typography color='#eda113ff' fontSize={26}
                        letterSpacing={6}
                        borderBottom={'solid black'}
                        
                        textTransform= 'uppercase'>
                            { wallet.title}
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{padding:'6px 8px', color: 'black'}}>
                        {`Balance: ${prefs.currency }  ${ wallet.accountBalance} `}
                        </Typography>
                        <Stack direction='row' spacing={6}>
                            <Box>
                                <LockClockIcon/>
                            <Typography variant="p" fontSize={12}>
                            {`Min balance: ${prefs.currency} ${wallet.minBalance}`}
                            </Typography>
                            </Box>
                            <Box>
                                <DateRangeIcon/>
                        <Typography variant="p" fontSize={12}>
                            {`MonthlyLimit: ${prefs.currency} ${wallet.monthlyLimit}`}
                        </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                    {/* <WalletFunding wallet={wallet}/> */}
                </Stack>
            </DemoPaper>
            {/* <WalletActions wallet={wallet}/> */}
            </Stack>
        </Box>
    );
}