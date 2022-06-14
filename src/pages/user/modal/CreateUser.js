import { Typography } from '@mui/material'
import React from 'react'
import { PrimaryModal } from '../../../components'

function CreateUser({ setOpen, open }) {
    return (
        <>
            <PrimaryModal open={open} setOpen={setOpen} >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </PrimaryModal>
        </>
    )
}

export default CreateUser