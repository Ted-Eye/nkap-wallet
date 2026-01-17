import {Paper} from '@mui/material';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SavingsIcon from '@mui/icons-material/Savings';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {Home} from '@mui/icons-material'
import {NavLink} from 'react-router-dom'

export default function NavigationLinks() {
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '56px', pb: 'env(safe-area-inset-bottom'}} elevation={16}>
                <BottomNavigation
                // showLabels
                // value={value}
                // onChange={(event, newValue) => {
                //     setValue(newValue); <Home/>
                // }}
                >
                    <NavLink to='/'>
                        <BottomNavigationAction icon={<Home/>} />
                    </NavLink>
                    <NavLink to='/transactions'>
                        <BottomNavigationAction icon={<ReceiptIcon />} />
                    </NavLink>
                    <NavLink to='/wallets'>
                        <BottomNavigationAction icon={<SavingsIcon />} />
                    </NavLink>
                    <NavLink to='/settings'>
                        <BottomNavigationAction icon={<ManageAccountsIcon />} />
                    </NavLink>
                </BottomNavigation>
            </Paper>
    )
}
