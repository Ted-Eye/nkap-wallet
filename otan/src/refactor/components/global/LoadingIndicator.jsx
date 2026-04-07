import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

export default function LoadingIndicator() {
    return (
        <Box sx={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: (theme) => theme.zIndex.modal + 10,
            flexDirection: 'column'
        }}>
            <CircularProgress color='warning' />
            <Typography variant='h6' sx={{mt: 2}}>Loading...</Typography>
        </Box>
    )
}
