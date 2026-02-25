import { Box } from '@mui/material'
import React from 'react'

function BgContainer({children}) {
    return (
        <Box sx={{bgcolor: 'rgba(213, 179, 43, 0.34)'}}>
            {children}
        </Box>
    )
}

export default BgContainer
