import React from 'react'
import { Deposit, Withdraw } from './CustomIcons'
import { Box, Stack } from '@mui/material'
import Button from '@mui/material/Button';

import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import {useModal} from '../../contexts/ModalContext';
import {EXPENSE_CATEGORIES, INCOME_CATEGORIES, MODAL_TYPES} from '../../lib/konstants/Defaults';
import dayjs from 'dayjs';
import {SEND_DEFAULTS, RECEIVE_DEFAULTS} from '../../lib/konstants/Defaults'
import { stampDate } from '../../utils/helperFunctions/Utils';
import { transactionDefaultValues } from '../../schemas/TransactionSchema';

export default function WalletActions({wallet}) {
    const {handleOpenModal} = useModal();

    return (
            <Stack direction="row">
                <Button 
                sx={{width: '100%'}}
                onClick={()=>handleOpenModal(MODAL_TYPES.t, MODAL_TYPES.modes.cashIn, {...SEND_DEFAULTS, id:crypto.randomUUID(), date: stampDate(), motive: INCOME_CATEGORIES[0].value, type: 'Cash-in', wallet: wallet.title, walletID: wallet.id})}
                variant="outlined" 
                startIcon={<SouthEastIcon
                />}>
                    Receive
                </Button>
                <Button 
                sx={{width: '100%'}}
                onClick={()=>handleOpenModal(MODAL_TYPES.t, MODAL_TYPES.modes.cashOut, {...SEND_DEFAULTS, id:crypto.randomUUID(), date: stampDate(), motive: EXPENSE_CATEGORIES[0].value, type: 'Cash-out', wallet: wallet.title, walletID: wallet.id})}
                variant="contained" 
                endIcon={<NorthEastIcon />}>
                    Send
                </Button>
            </Stack>
        // <Stack direction='row' spacing={16} bgcolor='white' padding='5px 12px' border='solid 0.1px white' borderRadius='5px' sx={{bgcolor: '#010714bf', color: 'white'}}>
        //     <Deposit wallet={wallet}/>
        //     <Withdraw wallet={wallet}/>
        // </Stack>
    )
}
