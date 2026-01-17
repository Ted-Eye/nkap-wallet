import {AppBar, Toolbar,
    Box, IconButton, Typography,
    Menu, Container, Avatar, Button,
    Tooltip, MenuItem
} from '@mui/material'
import {DotsThreeCircleIcon} from '@phosphor-icons/react';
import {AndroidLogoIcon} from '@phosphor-icons/react';
import { useState } from 'react';
import UserAvatar from '../user/UserAvatar';
import { NavLink } from 'react-router-dom';


const pages = ['Home', 'Wallets', 'Settings'];
const settings = ['@Ted-Eye', 'Account', 'Dashboard', 'Logout'];
export default function NavigationBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="fixed" sx={{ bgcolor: '#383638ff' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AndroidLogoIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        {/* <AndroidLogoIcon/> */}
                        
                    </Typography>
                    
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to={'/'}
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        <img width={100} src="IMG_20260117_081502.png" alt="Logo" />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <DotsThreeCircleIcon color="#ae7407ff" weight="fill"/>
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                        {pages.map((link, index) => (
                                            <MenuItem 
                                            component= {NavLink}
                                            to={link==='Home'? '/': `/${link}`}
                                            key={link} 
                                            onClick={handleCloseNavMenu}>
                                            <Typography sx={{ textAlign: "center" }}>{link}</Typography>
                                            </MenuItem>
                                        ))}
                        </Menu>
                    </Box>
                    <Typography sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} >
                        {/* <AndroidLogoIcon/> */}
                        {/* <img width={50} src="fen_s logo.png" alt="" /> */}
                    </Typography>
                    
                    <Typography
                        variant="h5"
                        noWrap
                        component={NavLink}
                        to={'/'}
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        
                        <img width={100} src="IMG_20260117_081502.png" alt="Logo" />
                    </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
                    {pages.map((page) => (
                    <Button
                                        key={page}
                                        component={NavLink}
                                        to={page==='Home'? '/': `/${page.toLowerCase()}`}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: "#eda113ff", display: "block" }}
                                    >
                                        {page}
                                    </Button>
                    ))}
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                        <UserAvatar/>
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                </Toolbar>
        </Container>
    </AppBar>
    );
}
