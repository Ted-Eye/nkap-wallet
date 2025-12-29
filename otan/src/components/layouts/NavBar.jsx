import React, { useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Grid,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Box,
    Link,
    styled,
} from "@mui/material";

import { 
    AccountBalanceWallet, 
    Menu as MenuIcon, 
    Home, 
    History, 
    Tune} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

// export default function NavBar() {

//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             <AppBar position="static">
//                 <Toolbar>
//                     <Box >
//                         <Box >
//                             <IconButton
//                                 size="large"
//                                 edge="start"
//                                 color="inherit"
//                                 aria-label="menu"
//                                 sx={{ mr: 2 }}
//                             >
//                                 <Money/>
//                                 <span><h1>'ffair N'kap. </h1></span>
//                             </IconButton>
//                             <p>Pocket neva dry </p>
//                         </Box>
//                         <Box>
//                             <Link>Pocket neva dry </Link>
//                         </Box>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//         </Box>
//     )
// }

const pages = ["Home", "Wallets", "Transactions", "Preferences"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const StyledToolBar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: 'crimson'
});

export default function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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
        <AppBar position="sticky">
            <StyledToolBar>
            <AccountBalanceWallet sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component={NavLink}
                to={'/'}
                sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                }}
            >
                N'kap
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
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
            <AccountBalanceWallet sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                }}
            >
                N'kap
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                <Button
                    key={page}
                    component={NavLink}
                    to={page==='Home'? '/': `/${page.toLowerCase()}`}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                >
                    {page}
                </Button>
                ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ pr: 5 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                        {setting}
                    </Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            </StyledToolBar>
        </AppBar>
    );
}
