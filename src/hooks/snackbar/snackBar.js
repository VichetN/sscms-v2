import { Alert, Snackbar } from "@mui/material"
import { useEffect, useState } from "react"

export const OpenSnackBar = ({ open, alertVariant, message, setSnackBar }) => {

    const [openSnackBar, setOpenSnackBar] = useState(false)

    useEffect(() => {
        if (open) {
            setOpenSnackBar(open)
            setSnackBar({
                open:false,
                message:message,
                variant:alertVariant
            })
        }
    }, [open, setOpenSnackBar, setSnackBar,alertVariant,message])

    return (
        <Snackbar
            open={openSnackBar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackBar(false)}
            // message="Note archived"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert variant="filled" onClose={() => setOpenSnackBar(false)} severity={alertVariant} sx={{ width: '100%' }}  >
                {message}
            </Alert>
        </Snackbar>
    )
}
