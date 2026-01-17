import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useWallet } from '../../contexts/WalletContext';

const AppDialog = ({title, payLoad, btnText, handleCloseModal, notice, children}) => {
    const {deleteWallet} = useWallet()
    // console.log(payLoad)
    const onSubmit = () =>{
        deleteWallet(payLoad.id)
        handleCloseModal()
    }
    return (
        <>
            <DialogTitle sx={{textAlign: 'center'}}>
                            {title || 'Add Title...'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {notice}
                </DialogContentText>
                    {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button 
                type='submit'
                onClick={onSubmit}>{btnText}</Button>
            </DialogActions>
        </>
    )
}

export default AppDialog
