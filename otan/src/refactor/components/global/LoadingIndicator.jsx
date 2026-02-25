import { Box, CircularProgress, Container, Typography } from '@mui/material'
import React from 'react'

export default function LoadingIndicator() {
    
    return (
        <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}}>
            <Box>
                <CircularProgress color='warning'/>
            </Box>
            <Typography variant='h6' sx={{ml: 2}}>Loading...</Typography>
        </Container>
    )
}
