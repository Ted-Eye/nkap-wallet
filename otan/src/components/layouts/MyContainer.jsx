import React from 'react';
import {Box, Paper, Stack, Typography} from '@mui/material';

export default function MyContainer({children}) {
    return (
        <Box sx={{height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Paper sx={{width: '400', padding: '2'}}>
                {children}
            </Paper>
        </Box>
    )
}
