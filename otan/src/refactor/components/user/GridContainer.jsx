import React from 'react'
import {styled} from '@mui/material/styles';
import {Box, Paper, Grid} from '@mui/material'
const Item = styled(Paper)(({theme})=>({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
    }),
}))
export default function GridContainer({children}) {
    return (
    <Box sx={{flexGrow: 1, mt: 1}}>
        <Grid container spacing={1}>
            <Grid size={{xs: 6, md: 3}}>
                <Item>Marketllace</Item>
            </Grid>
            <Grid size={{xs: 6, md: 3}}>
                <Item>Njangi</Item>
            </Grid>
            <Grid size={{xs: 6, md: 3}}>
                <Item>Secure payments</Item>
            </Grid>
            <Grid size={{xs: 6, md: 3}}>
                <Item>Vault</Item>
            </Grid>       
        </Grid>
    </Box>
    )
}
