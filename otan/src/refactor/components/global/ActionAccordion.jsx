import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, AccordionActions, Button, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DeleteWalletAction, EditWalletAction } from '../wallet/WalletActions';
import { Link } from 'react-router-dom';
export default function ActionAccordion(props) {
    
    return (
        <Accordion sx={{mt: 1, mb: 1, bgcolor: '#3e3b34ff', color: 'white', border: 'solid 1px #ae7407ff'}}>
                <AccordionSummary
                    
                    expandIcon={<ExpandMoreIcon sx={{color: '#ae7407ff'}}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography sx={{}}>{props.wallet.title } wallet</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {props.children}
                    </Typography>
                </AccordionDetails>
                <AccordionActions>
                    <Stack direction={'row'} spacing={2}>
                        <Link 
                        key={props.id} to={`/wallets/${props.wallet.title}`}>
                        Details
                        </Link>
                        <EditWalletAction wallet={props.wallet}/>
                        <DeleteWalletAction wallet={props.wallet}/>
                    </Stack>
                    

                    {/* <Button size="small">Cancel</Button>
                    <Button size="small" variant="contained">Save</Button> */}
                </AccordionActions>
            </Accordion>
    )
}
