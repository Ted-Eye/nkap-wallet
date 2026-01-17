import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function SimpleBackdrop({isOpen, onClose, children, content, onSave}) {
    // const [open, setOpen] = React.useState(false);
    // const handleClose = () => {
    //     setOpen(false);
    // };
    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // if (!isOpen) return null;
    
    return (
        <>
        {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        >
            {children}
        </Backdrop>
        </>
    );
}