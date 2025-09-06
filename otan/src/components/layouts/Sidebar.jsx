import React from 'react'
import UserPreferences from '../UserPreferences'
import {Box, Typography, Stack, Container, Button, Grid} from '@mui/material';
import {Home, Settings, Settings as SettingsIcon} from '@mui/icons-material'
// import '../styles/Sidebar.css'
import Preferences from '../Preferences'
import Wallets from '../../pages/walletsList/Wallets';

const Sidebar = ({userSettings, onSave}) => {


    

    return (
        <Box bgcolor={'white'} mt={'2px'} px={'10px'} flex={1} sx={{display: {xs: 'none', sm: 'block'}, }}>
            {/* <Preferences onSave={onSave}/> */}
            <Box position={"fixed"}>
                <Grid direction={'column'}>
                <Typography variant='p'>
                    Username
                </Typography>
                <Wallets/>
                <Box>
                    <Button>
                        <Home/>
                        <Typography variant='p' ml={2}>Home</Typography>
                    </Button>
                    <Button>
                        <Settings/>
                        <Typography variant='p' ml={2}>Settings</Typography>
                    </Button>
                </Box>
                
            </Grid>
            </Box>
            
        </Box>
            
        
    )
}

export default Sidebar
