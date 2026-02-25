import {Paper} from '@mui/material';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SavingsIcon from '@mui/icons-material/Savings';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {Home} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'

export default function NavigationLinks() {
    const navigate = useNavigate();

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '56px', pb: 'env(safe-area-inset-bottom'}} elevation={16}>
                <BottomNavigation
                    onChange={(event, newValue) => {
                        const paths = ['/home', '/transactions', '/wallets', '/settings'];
                        navigate(paths[newValue]);
                    }}
                >
                    <BottomNavigationAction icon={<Home/>} />
                    <BottomNavigationAction icon={<ReceiptIcon />} />
                    <BottomNavigationAction icon={<SavingsIcon />} />
                    <BottomNavigationAction icon={<ManageAccountsIcon />} />
                </BottomNavigation>
            </Paper>
    )
}
