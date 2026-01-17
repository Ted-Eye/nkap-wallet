import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AppDialog = ({title, payLoad, btnText, handleCloseModal, children, onSubmit}) => {
    return (
        <>
            <DialogTitle sx={{textAlign: 'center'}}>
                            {title || 'Add Title...'}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {payLoad&& payLoad}
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
