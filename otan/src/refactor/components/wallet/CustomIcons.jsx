import React from 'react'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import { Box, Button, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import { ArrowCircleUp, MoveToInbox } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useModal } from '../../contexts/ModalContext';
import {MODAL_TYPES} from '../../lib/konstants/Defaults'

// FONT AWESOME ICONS
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'

// /* import all the icons in Free Solid, Free Regular, and Brands styles */
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'

// library.add(fas, far, fab);



export const RecentTransactions = () => {

    const handleClick = ()=>{
        console.log('clicked')
    }
    return (
        <>
        <Stack>
            <IconButton onClick={handleClick}>
                    <ImportExportIcon color='inherit'/>
                </IconButton>
            <Typography variant="body2" color="text.secondary"> Log </Typography>
        </Stack>
        </>
    )
};

export const Deposit = ({wallet, handleOpenForm, defaultValues }) => {

    // console.log('Deposit props:', wallet, handleOpenForm, defaultValues);
    return ( 
        <>
            <Stack>
                <IconButton onClick={()=>{handleOpenForm('transaction', {...defaultValues, id:crypto.randomUUID(), date: dayjs().toISOString(), motive: 'Shopping', type: 'Cash-in', wallet: wallet.title, walletID: wallet.id})}} color='success'>
                    <ControlPointDuplicateIcon/>
                </IconButton>
            <Typography variant="body2"> Deposit </Typography>
            </Stack>

            {/* <Stack direction={'column'}>
                <Chip size='medium' onClick={handleClick} icon={<ArrowCircleDownIcon/>} variant="outlined" sx={{ margin: 1, color: 'success', }} color='success'>
                </Chip>
                <Typography color='text.secondary'> New Deposit </Typography>
            </Stack> */}
        </>
    )
};

export const Withdraw = () => {
    const modals = modalTypes
    const {handleOpenModal} = useModal()
    const handleClick = ()=>{
        console.log('clicked')
    }
    return (
        <>
            <Stack>
                <IconButton onClick={()=>handleOpenModal(modals.warning, 'Hello')}>
                    <ArrowOutwardIcon color='warning'/>
                </IconButton>
            <Typography variant="body2" > Withdraw </Typography>
            </Stack>
        </>
    )
};

export const Details = () => {

    const handleClick = ()=>{
        console.log('clicked')
    }
    return (
        <>
            <Stack>
                <IconButton onClick={handleClick}>
                    <QueryStatsIcon color='warning'/>
                </IconButton>
            <Typography variant="body2" color="text.secondary"> Details </Typography>
            </Stack>
        </>
    )
};