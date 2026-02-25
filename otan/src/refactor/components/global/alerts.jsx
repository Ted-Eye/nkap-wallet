import {Alert, IconButton, Snackbar} from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';

// export default function DescriptionAlerts() {
//     return (
//     <Stack sx={{ width: '100%' }} spacing={2}>
//         <Alert severity="info">
//             <AlertTitle>Info</AlertTitle>
//             This is an info Alert with an informative title.
//         </Alert>
//         <Alert severity="warning">
//             <AlertTitle>Warning</AlertTitle>
//             This is a warning Alert with a cautious title.
//         </Alert>
//         <Alert severity="error">
//             <AlertTitle>Error</AlertTitle>
//             This is an error Alert with a scary title.
//         </Alert>
//         </Stack>
//     );
// }


export function Success({ message, onClose }) {
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
    
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="success" action={action} variant='filled'>
                <AlertTitle>{message}</AlertTitle>
                
            </Alert>
        </Snackbar>
    )
};

export function Error({ message, onClose }) {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {message}
        </Alert>
    )
};

export function Info({ message, onClose }) {
    return (
        <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            {message}
        </Alert>
    )
};

export function Warning({ message, onClose }) {
    return (
        <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            {message}
        </Alert>
    )
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
    const [type, setType] = useState(null);
    const [message, setMessage] = useState('completed!')
    // if(alertType===null) return null
    // const type = alertType;
    
    
    console.log(alertType, message)
    useEffect(()=>{
        setType(alertType)
    }, [])
    switch (type) {
        case 'success':
            alert(message)
            return <Alert severity="success" variant='filled'>
                <AlertTitle>{message}</AlertTitle>
            </Alert>;
        case 'error':
            return <Error message={message} onClose={onClose} />;
        case 'info':
            return <Info message={message} onClose={onClose} />;
        case 'warning':
            return <Warning message={message} onClose={onClose} />;
        default:
            return null;
    }
}