import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WalletForm from '../forms/WalletForm';
import {FormProvider, useFormContext} from 'react-hook-form'
import MyContainer from '../layouts/MyContainer';
import { Paper } from '@mui/material';
import ModalContainer from '../layouts/ModalContainer';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: '#cfe8fc',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MyModal({isOpen, onClose, children, newWallet, onChange, onSave}) {

    if (!isOpen) return null;

    return (
        <ModalContainer >
            
            {children}
                
        </ModalContainer>
        
    );
}
