import { Box, Container, Paper } from "@mui/material"

const HomeLayout = ({children}) => {
    return (
        <Box sx={{height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Paper sx={{width: '100%', padding: '2'}}>
                {children}
            </Paper>
        
        </Box>
    )
    }

export default HomeLayout;
