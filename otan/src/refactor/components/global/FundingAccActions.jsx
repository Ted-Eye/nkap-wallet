import React from 'react'
import {MODAL_TYPES, TRANSACTION_TYPES} from '../../lib/konstants/Defaults';
import { Button, Stack, Typography } from '@mui/material';
import { useModal } from '../../contexts/ModalContext';
import { FundingAccDefaults } from '../../schemas/FundingAccSchema';
import { date } from 'zod';
import { stampDate } from '../../utils/helperFunctions/Utils';
import { ChargingStationIcon, HandWithdrawIcon } from '@phosphor-icons/react';
import { useFunding } from '../../contexts/FundingAccContext';
import { usePrefs } from '../../contexts/PrefsContext';
import {transactionDefaultValues} from '../../schemas/TransactionSchema'
import { useAuth } from '../../contexts/AuthContext';

const payLoad = FundingAccDefaults
export default function FundingAccActions({wallet}) {
    const {handleOpenModal} = useModal();
    return (
        <Button 
                sx={{textTransform: 'none'}}
                onClick={()=>handleOpenModal(MODAL_TYPES.t, MODAL_TYPES.modes.cashOut, {...transactionDefaultValues, transactionType: TRANSACTION_TYPES[0], wallet: wallet.id, note: 'Cash withdrawal', motive: 'others'})}
                // variant="outlined" 
                
                >
                    <Stack alignItems={'center'} >
                        <HandWithdrawIcon size={32} color="black" weight="fill"/>
                    <Typography variant='subtitle' 
                    fontSize={14} color='black'
                    >Cash-out</Typography>
                    </Stack>
                </Button>
    )
}

export const HubTopUpAction = ({wallet})=>{
    const {handleOpenModal} = useModal();
    const {accBalance} = useFunding()
    const {prefs} = useAuth();
    
    return(
        <Stack direction={'row'} sx={{}}>
            <Button 
            sx={{textTransform: 'none'}}
            onClick={()=>handleOpenModal(MODAL_TYPES.t, MODAL_TYPES.modes.cashIn, {...transactionDefaultValues, transactionType: TRANSACTION_TYPES[1], wallet: wallet.id, note: 'Account recharge', motive: 'others'})}
            >
            <Stack sx={{alignItems: 'center'}}>
                <ChargingStationIcon size={32} color="#eda113ff" weight="fill"/>
            <Typography variant='subtitle'
            fontSize={14} color='black'
            >Top-up</Typography>
            </Stack>
        </Button>
            <Typography variant='subtitle2'
            fontSize={18} ml={0} color='#eda113ff'
            >
                {`Hub: ${prefs.currency} ${wallet.accountBalance}`}
            </Typography>
        </Stack>
    )
}
