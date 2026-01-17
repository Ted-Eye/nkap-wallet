import { Container } from '@mui/material'
import React from 'react';
import SimpleBackdrop  from '../utils/BackDrp'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: '#cfe8fc',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalContainer({children}) {


    return (
        <Container sx={style}>
            {children}
        </Container>
    )
}
