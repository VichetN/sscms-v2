import { Box, Button, Divider, Fab, Grid, Typography } from '@mui/material'
import React from 'react'
import { FaBars } from 'react-icons/fa'
import { Spin as Hamburger } from 'hamburger-react'

//style
import './Header.scss';

function Header({ handleToggleSidebar, toggled }) {
    return (
        <Box className='ssc_header'>
            <Box className='ssc_header_content'>
                {/* <Button className="btn-toggle" onClick={() => handleToggleSidebar(true)}> */}
                {/* <FaBars /> */}
                <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                    <Hamburger
                        toggled={toggled}
                        size={20}
                        // toggle={handleToggleSidebar}
                        duration={1}
                        // rounded
                    />
                </div>
                {/* </Button> */}

                <Grid container spacing={2}>
                    <Grid item xs={6} md={6} >
                        {/* <Box className='ssc_header_content_left'>
                            <Typography variant="h5" gutterBottom component="div">
                                h4. Heading
                            </Typography>
                        </Box> */}
                    </Grid>
                    <Grid item xs={6} md={6}>

                    </Grid>
                </Grid>
            </Box>

            <Divider className='ssc_header_divider' />
        </Box>
    )
}

export default Header