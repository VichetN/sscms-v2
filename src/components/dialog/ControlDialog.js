import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function ControlDialog({open,setOpen,handleYes,description,title}) {

    const handleOk = ()=>{
        handleYes()
        setOpen(false)
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {description}
                        
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className='ssc_text_field' autoFocus onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button className='ssc_text_field' onClick={handleOk}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ControlDialog