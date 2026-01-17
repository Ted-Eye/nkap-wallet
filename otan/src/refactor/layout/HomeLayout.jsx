import { Container, Paper } from "@mui/material"

const HomeLayout = ({children}) => {
    return (
        <Container sx={{height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Paper sx={{width: '400', padding: '2'}}>
                {children}
            </Paper>
        
        </Container>
    )
    }

export default HomeLayout;
