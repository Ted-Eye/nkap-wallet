import React from 'react'
import {MODAL_TYPES} from '../../lib/konstants/Defaults';
import { Button, Stack, Typography } from '@mui/material';
import { useModal } from '../../contexts/ModalContext';
import { FundingAccDefaults } from '../../schemas/FundingAccSchema';
import { date } from 'zod';
import { stampDate } from '../../utils/helperFunctions/Utils';
import { ChargingStationIcon, HandWithdrawIcon } from '@phosphor-icons/react';
import { useFunding } from '../../contexts/FundingAccContext';
import { usePrefs } from '../../contexts/PrefsContext';

const payLoad = FundingAccDefaults
export default function FundingAccActions() {
    const {handleOpenModal} = useModal();
    return (
        <Button 
                sx={{textTransform: 'none'}}
                onClick={()=>handleOpenModal(MODAL_TYPES.a, MODAL_TYPES.modes.debit, {...payLoad, id: crypto.randomUUID(), type: MODAL_TYPES.modes.debit, date: stampDate()})}
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

export const HubTopUpAction = ()=>{
    const {handleOpenModal} = useModal();
    const {accBalance} = useFunding()
    const {prefs} = usePrefs()
    return(
        <Stack direction={'row'} sx={{}}>
            <Button 
            sx={{textTransform: 'none'}}
            onClick={()=>handleOpenModal(MODAL_TYPES.a, MODAL_TYPES.modes.credit, {...payLoad, id: crypto.randomUUID(), date: stampDate()})}
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
                {`Hub: ${prefs.currency} ${accBalance}`}
            </Typography>
        </Stack>
    )
}
