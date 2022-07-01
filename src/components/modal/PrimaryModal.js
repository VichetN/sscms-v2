import { Box, Dialog, DialogContent, DialogTitle, Modal, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

//style
import './PrimaryModal.scss';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 600,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

function PrimaryModal({ title, setOpen, open, children }) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
      };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            className="ssc_primary_dialog"
            aria-labelledby="responsive-dialog-title"
        >
            
            <DialogTitle id="responsive-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            
        </Dialog>
    )
}

export default PrimaryModal