import React from 'react'
import UserPreferences from '../UserPreferences'
import {Box, Typography, Stack, Container, Button, Grid} from '@mui/material';
import {Home as HomeIcon, Settings, Settings as SettingsIcon} from '@mui/icons-material'
// import '../styles/Sidebar.css'
import Wallets from '../../pages/walletsList/Wallets';
import Preferences from '../../pages/Preferences/Preferences';

const Sidebar = ({userSettings, onSave}) => {


    

    return (
        <> 

        <Box>
            <Box bgcolor={'white'} mt={'2px'} px={'10px'} flex={1} sx={{display: {xs: 'none', sm: 'block'}, }}>
            {/* <Preferences onSave={onSave}/> */}
                {/* <Box position={"fixed"}>
                    <Grid direction={'column'}>
                        <Typography variant='p'>
                            Username
                        </Typography>
                    </Grid>
                </Box> */}
            </Box>
                

                {/* BOTTOM NAV ICONS */}
            <Container>
            <Box>
                <Box>
                    <Button>
                    <HomeIcon/>
                    </Button>
                    <Box>
                        <Typography variant='p' ml={2}>Home</Typography>
                    </Box>
                </Box>
                <Button>
                    <SettingsIcon/>
                    <Typography variant='p' ml={2}>Settings</Typography>
                </Button>
            </Box>
            </Container>
        </Box>
        </>
    )
}

export default Sidebar
