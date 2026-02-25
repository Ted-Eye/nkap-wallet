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
export default function MyGridContainer({children}) {
    return (
    <Box sx={{flexGrow: 1, mt: 1}}>
        <Grid container spacing={2} mt={2}>
            {children}   
        </Grid>
    </Box>
    )
}

export const GridItem = ({children}) => {
    return (<Grid size={{xs: 6, md: 3}}>
                <Item sx={{bgcolor: '#eda113ff', border: 'solid 1px green'}}>
                    {children}
                </Item>
            </Grid>  )
}