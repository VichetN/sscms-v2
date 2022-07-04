import { Box, Typography } from '@mui/material';
import React from 'react'

//style
import './PageTitle.scss';

function PageTitle({title}) {
  return (
    <Box className='ssc_page_title'>
        <Typography variant='h5' style={{fontWeight:'bolder'}}>{title}</Typography>
    </Box>
  )
}

export default PageTitle