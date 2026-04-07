import {Alert, Box, IconButton, Snackbar} from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { useAuth } from '../../contexts/AuthContext';


export function AlertDisplay({alert, title, message, onClose }) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
    <React.Fragment>
        <IconButton
            size="small"
            aria-label="close" 
            color="red"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    </React.Fragment>);
    
    console.log(title, message)
    switch (alert) {
        case 'success':
            return (
                <Snackbar open={open} 
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{mt: 8}}
                autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="success" action={action} variant='filled'>
                        <AlertTitle>{title}</AlertTitle>
                        {message}
                    </Alert>
                </Snackbar>
            );
        case 'error':
            return (
                <Snackbar open={open} 
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{mt: 8}}
                autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="error" action={action} variant='filled'>
                        <AlertTitle>{title}</AlertTitle>
                        {message}
                    </Alert>
                </Snackbar>
            );
        case 'info':
            return (
                <Snackbar open={open} 
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{mt: 8}}
                autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="info" action={action} variant='filled'>
                        <AlertTitle>{title}</AlertTitle>
                        {message}
                    </Alert>
                </Snackbar>
            );
        case 'warning':
            return (
                <Snackbar open={open} 
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{mt: 8}}
                autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="warning" action={action} variant='filled'>
                        <AlertTitle>{title}</AlertTitle>
                        {message}
                    </Alert>
                </Snackbar>
            );
        default:
            return null;
    }
};

export const AlertComponent = ({onClose }) => {
    const [open, setOpen] = React.useState(true);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        if(onClose) onClose();
    };
    const {alertType, walletMsg} = useWallet()
    const [title, setTitle] = useState('')
    const {authAlert} = useAuth()
    const {type, message} = authAlert
    const alertCode = alertType || type
    const alertMsg = walletMsg || message
    // console.log(alertMsg)
    useEffect(()=>{
        switch(alertCode) {
            case 'success':
                setTitle(alertCode===alertType? 'Completed!' : "Account created!")
                break;
            case 'error':
                setTitle(alertCode===alertType? 'User not found' : 'Network error')
                break;
            case 'info':
                setTitle(alertCode===alertType? 'Insufficient funds': 'Invalid username')
                break;
            case 'warning':
                setTitle('Watch out!')
                break;
            default:
                setTitle('')
        }
    }, [alertCode])
    
    if(!alertCode || !alertCode) return null;
    
    return <AlertDisplay message={alertMsg} onClose={handleClose} alert={alertCode} title={title}/>
}