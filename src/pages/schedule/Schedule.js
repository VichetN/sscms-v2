import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import { PageTitle } from '../../components';

//style
import './Schedule.scss';

function Schedule() {
    return (
        <Container maxWidth="xl" className="ssc_container">

            <Box>
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <PageTitle title={'Schedule'} />
                    </Grid>
                    {/* <Grid item md={4}>
                    </Grid>
                    <Grid item md={4}>
                    </Grid> */}
                </Grid>
            </Box>
        </Container>
    )
}

export default Schedule