import { Box, Modal, Typography } from '@mui/material'
import React from 'react'

//style
import './PrimaryModal.scss';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function PrimaryModal({setOpen,open,children}) {
    return (
        <Modal
            open={open}
            onClose={()=> setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{bgcolor:'background.paper',p:4}} className='ssc_primary_modal'>
                {children}
            </Box>
        </Modal>
    )
}

export default PrimaryModal