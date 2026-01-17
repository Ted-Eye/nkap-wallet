import { useEffect, useState } from 'react'
import {Box, TextField, Select, InputLabel, MenuItem, FormControl, InputAdornment, Input, FilledInput, OutlinedInput, Button, Paper, Container, Typography} from '@mui/material';

import {PostAdd} from '@mui/icons-material'


const AllTransactions = ({wallets, bankStatement=[], prefs}) => {

    const [listing, setListing]=useState(bankStatement)
    const [loading, setLoading] = useState(false)
    const settings=prefs
    let phrase;
    

    loading&& (<div>Loading...</div>)

    // useEffect(()=>{
    //     setListing(bankStatement)
    // },[])
    return (
        <>
            <Box>
                <Container>
                    {listing&&
                    `Recent Transactions: (${listing.length})`
                    }
                    <br />
                    <Button>All</Button> <Button>Deposits</Button> <Button>Withdrawals</Button>
                </Container>
                {   
                    listing.length===0? <Paper>No transactions yet</Paper>
                    :listing.map((transaction, id)=> (
                        <Paper key={id}>
                            <Typography variant='h5'>
                            {`${transaction.date }: ${transaction.type==='Cash-in'? 'Deposit to ' : 'Withdrawal from '}  ${transaction.wallet }: ${ settings.currency} ${transaction.amount}`}
                            </Typography>    
                        </Paper>
                    ))
                }
            </Box>

        </>
    )
}

export default AllTransactions