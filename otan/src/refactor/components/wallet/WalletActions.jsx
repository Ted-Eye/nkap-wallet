import React from 'react'
import { Deposit, Withdraw } from './CustomIcons'
import { Box, Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button';

import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { ArrowCircleDownIcon, ArrowCircleDownRightIcon, ArrowCircleUpRightIcon } from '@phosphor-icons/react'
import {useModal} from '../../contexts/ModalContext';
import {TRANSACTION_TYPES, MODAL_TYPES} from '../../lib/konstants/Defaults';
import dayjs from 'dayjs';
import {SEND_DEFAULTS, RECEIVE_DEFAULTS} from '../../lib/konstants/Defaults'
import { stampDate } from '../../utils/helperFunctions/Utils';
import { transactionDefaultValues } from '../../schemas/TransactionSchema';

export default function WalletActions({wallet}) {
    const {handleOpenModal} = useModal();

    return (
            <Stack spacing={1} p={1.2} sx={{border: 'solid 2px #eda113ff', borderRadius:2, bgcolor: 'whitesmoke'}}>
                <Typography variant='subtitle1' >
                    {/* Make & Receive payments in one place, keeping track of your cash flow */}
                </Typography>
                <Stack direction="row" spacing={1}>
                <Button 
                sx={{width: '100%', textTransform: 'none', color: 'black'}}
                onClick={()=>handleOpenModal(MODAL_TYPES.t, MODAL_TYPES.modes.cashIn, {...transactionDefaultValues, transactionType: TRANSACTION_TYPES[1], wallet: wallet.id})}
                // variant="outlined" 
                startIcon={<ArrowCircleDownRightIcon size={36} color="#eda113ff" weight="fill"
                />}>
                    Recharge
                </Button>
                <Button 
                sx={{width: '100%', textTransform: 'none', borderLeft: 'solid #eda113ff 3px', borderRadius: 0, color: 'black'}}
                onClick={()=>handleOpenModal(MODAL_TYPES.t, MODAL_TYPES.modes.cashOut, {...transactionDefaultValues, transactionType: TRANSACTION_TYPES[0], wallet: wallet.id, origin_id: wallet.id, receiver_name: ''})}
                // variant="contained" 
                startIcon={<ArrowCircleUpRightIcon size={36} color="black" weight="fill" />}
        
                >
                    Send
                </Button>
            </Stack>
            </Stack>
        // <Stack direction='row' spacing={16} bgcolor='white' padding='5px 12px' border='solid 0.1px white' borderRadius='5px' sx={{bgcolor: '#010714bf', color: 'white'}}>
        //     <Deposit wallet={wallet}/>
        //     <Withdraw wallet={wallet}/>
        // </Stack>
    )
};

export const EditWalletAction = ({wallet}) =>{
    const {handleOpenModal} = useModal()

    return(
        <Button 
            onClick={()=> handleOpenModal(MODAL_TYPES.w, MODAL_TYPES.modes.editWallet, wallet)}
            variant='outlined'>
                Edit
        </Button>
    )
};

export const DeleteWalletAction = ({wallet}) =>{
    const {handleOpenModal} = useModal()
    return (
        <Button 
            onClick={()=> handleOpenModal(MODAL_TYPES.n, MODAL_TYPES.modes.delete, wallet)}
            variant='outlined'>
                Delet
        </Button>
    )
}
