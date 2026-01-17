import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useModal } from '../../contexts/ModalContext';
import { forwardRef, useState } from 'react';
import {Box, colors, Typography} from '@mui/material'
import { BorderAllRounded } from '@mui/icons-material';
import {MODAL_TYPES } from "../../lib/konstants/Defaults";
import AppDialog from './AppDialog';
import SendingForm from '../../forms/SendingForm';
import ReceivingForm from '../../forms/ReceivingForm';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'white',
    // border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AppModal({children}) {
    // const [title, setTitle] = useState('')
    const {isOpen, modalType, mode, modalData, handleCloseModal} = useModal();
    if(!isOpen) return null;
    const title = mode;
    const payLoad = modalData
    
    let btnText;
    switch (title){
        case MODAL_TYPES.modes.credit:
            btnText = 'Top-up'
            break;
        case MODAL_TYPES.modes.newWallet: 
            btnText = 'Add'
            break;
        case MODAL_TYPES.modes.cashOut || MODAL_TYPES.modes.cashIn:
            btnText = 'Submit'
            break;
        case MODAL_TYPES.warn: 
            btnText = 'Yes'
            break;
        default: btnText = 'Ok'
    }
    const onSubmit = ()=>{
        console.log('Submitting:', title);
        handleCloseModal()
    }
    
    switch(modalType){
        case MODAL_TYPES.a:
            return (
        <>
        <Dialog
            open={open}
            slots={{
            transition: Transition,
            }}
            keepMounted
            onClose={handleCloseModal}
            sx={{position: 'fixed', bottom: '4'}}
            aria-describedby="alert-dialog-slide-description"
        >
            Funding Account's Transactions
        </Dialog>
        </>);

        case MODAL_TYPES.n:
            return (
        <>
        <Dialog
            open={open}
            slots={{
            transition: Transition,
            }}
            keepMounted
            onClose={handleCloseModal}
            sx={{position: 'fixed', bottom: '4'}}
            aria-describedby="alert-dialog-slide-description"
        >
            <AppDialog
                title={title}
                payLoad={payLoad}
                btnText={btnText}
                handleCloseModal={handleCloseModal}
                onSubmit={onSubmit}
            />
        </Dialog>
        </>);

        case MODAL_TYPES.t:
            
            return (
        <>
        <Dialog
            open={open}
            slots={{
            transition: Transition,
            }}
            keepMounted
            onClose={handleCloseModal}
            sx={{position: 'fixed', bottom: '4'}}
            aria-describedby="alert-dialog-slide-description"
        >
            {mode===MODAL_TYPES.modes.cashOut&& 
                <SendingForm
                title={title}
                payLoad={payLoad}
                btnText={btnText}
                handleCloseModal={handleCloseModal}
            />
            }
            {
                mode===MODAL_TYPES.modes.cashIn&&
                <ReceivingForm
                title={title}
                payLoad={payLoad}
                btnText={btnText}
                handleCloseModal={handleCloseModal}
            />
            }
        </Dialog>
        </>);
    }
    
}