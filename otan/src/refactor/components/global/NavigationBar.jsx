import {AppBar, Toolbar,
    Box, IconButton, Typography,
    Menu, Container, Avatar, Button,
    Tooltip, MenuItem
} from '@mui/material'
import {DotsThreeCircleIcon} from '@phosphor-icons/react';
import {AndroidLogoIcon} from '@phosphor-icons/react';
import { useState } from 'react';
import UserAvatar from '../user/UserAvatar';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


export default function NavigationBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const {user, isAuth, logOut, logIn} = useAuth();
    const username = user?.username || null;
    const pages = ['Home', 'Wallets', 'Transactions', 'Settings'];
    const settings = [isAuth&& `@${username}`, 'My profile', 'Dashboard'];
    
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
        <AppBar position="fixed" sx={{ bgcolor: '#383638ff', zIndex: 50}}>
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
                        <img width={100} src="logo.png" alt="Logo" />
                    </Typography>
                        {
                            isAuth && 
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
                                            to={`/${link}`}
                                            key={link} 
                                            onClick={handleCloseNavMenu}>
                                            <Typography sx={{ textAlign: "center" }}>{link}</Typography>
                                            </MenuItem>
                                        ))}
                        </Menu>
                    </Box>
                        }
                    
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
                        
                        <img width={100} src="logo.png" alt="Logo" />
                    </Typography>
                {
                    isAuth &&
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
                    {pages.map((page) => (
                    <Button
                                        key={page}
                                        component={NavLink}
                                        to={`/${page.toLowerCase()}`}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: "#eda113ff", display: "block" }}
                                    >
                                        {page}
                                    </Button>
                    ))}
                </Box>
                }
                {
                    isAuth? 
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
                        <Link key={setting} >
                            <MenuItem onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: 'center' }}>
                            {setting}
                            </Typography>
                        </MenuItem>
                        </Link>
                        
                    ))}
                    <MenuItem onClick={logOut}>
                        <Typography sx={{ textAlign: 'center' }}
                        onClick={handleCloseUserMenu}
                        >
                            Logout
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
                : <NavLink to={'/login'}>
                    <Button sx={{
                    color: 'green',
                    textTransform: 'none'}}>
                    Sign-In
                </Button>
                </NavLink>
                }
                </Toolbar>
        </Container>
    </AppBar>
    );
}
