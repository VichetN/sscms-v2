import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import {ImHome2} from 'react-icons/im'
import { useNavigate } from 'react-router-dom';

//style
import './NotFound.scss';

function NotFound() {

    const navigate = useNavigate()

    return (
        <>
            <Box className="ssc_notfound_container">
                <Box class="ssc_notfound_header">
                    <Typography variant="h4" gutterBottom component="div">
                        <b>OOPS</b>, Sorry, but the page you were trying to view does not exist.
                    </Typography>

                    <Typography variant='h1'>
                        404
                    </Typography>

                    <Button size='large' variant="outlined" onClick={()=> navigate('/')} startIcon={<ImHome2 />}>Primary</Button>

                </Box>
            </Box>
        </>
    )
}

export default NotFound