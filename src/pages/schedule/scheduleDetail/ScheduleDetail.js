import { Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsCalendarWeek, BsFillPersonCheckFill } from 'react-icons/bs'
import { MdEditNote, MdOutlineConfirmationNumber } from 'react-icons/md'
import { GrSchedules, GrSwim } from 'react-icons/gr'
import { IoCloseCircle } from 'react-icons/io5'
import { ControlDialog, PrimaryModal } from '../../../components'
import { FaSwimmingPool } from 'react-icons/fa'
import moment from 'moment'
import { useRequest } from 'ahooks'

//style
import './ScheduleDetail.scss'
import { deleteSchedule } from '../../../hooks/db'
import { IoMdArrowDroprightCircle, IoMdTrash } from 'react-icons/io'
import { SiGoogleclassroom } from 'react-icons/si';

function ScheduleDetail({ open, setOpen, data, fetchData }) {

    const [openConfirm, setOpenConfirm] = useState(false)

    const { run: deleteData, loading } = useRequest(deleteSchedule, {
        manual: true,
        onSuccess: (res) => {
            if (!res?.status) {
                return
            }

            setOpen(false)
            fetchData()

        },
    });

    return (
        <>

            <ControlDialog open={openConfirm} setOpen={setOpenConfirm} handleYes={() => deleteData({ sd_id: data?.sd_id })} title='Confirmation' description={'Do you want to delete? Please confirm.'} />

            <PrimaryModal open={open} setOpen={setOpen}
                title={
                    <Grid container spacing={4}>
                        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                            <Typography variant="h5" gutterBottom component="div">
                                <GrSchedules /> Schedule
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                Detail scheduled on date.
                            </Typography>
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                            <Stack direction={'row'} justifyContent='flex-end' alignItems={'center'}>
                                <IconButton color='error' onClick={() => setOpen(false)}>
                                    <IoCloseCircle />
                                </IconButton>
                            </Stack>

                        </Grid>
                    </Grid>
                }
            >
                <Grid container spacing={4}>

                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} textAlign='right'>
                        <BsCalendarWeek style={{ fontSize: 35 }} />
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        Date time
                        <Typography variant='h5' fontSize={15} fontWeight={'bold'}>{moment(data?.createdAt).format('DD-MMM-YYYY')}</Typography>
                        <Typography variant='h4' component={'i'} fontSize={15} fontWeight={'bold'}><AiOutlineClockCircle /> {data?.time}</Typography>
                        <Divider className='ssc_detail_divider' />

                    </Grid>

                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} textAlign='right'>
                        <GrSwim style={{ fontSize: 35 }} />
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        Name
                        <Typography variant='h5' fontSize={15} fontWeight={'bold'}>{data?.studentName}</Typography>
                        <Divider className='ssc_detail_divider' />
                    </Grid>

                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} textAlign='right'>
                        <SiGoogleclassroom style={{ fontSize: 35 }} />
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        Class
                        <Typography variant='h5' fontSize={15} fontWeight={'bold'}>{data?.className}</Typography>
                        <Typography variant='h4' component={'i'} fontSize={15} fontWeight={'bold'}><IoMdArrowDroprightCircle /> {data?.classType}</Typography>
                        <Divider className='ssc_detail_divider' />
                    </Grid>

                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} textAlign='right'>
                        <MdOutlineConfirmationNumber style={{ fontSize: 35 }} />
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        Invoice ID
                        <Typography variant='h5' fontSize={15} fontWeight={'bold'}>{data?.invoiceNumber}</Typography>
                        <Divider className='ssc_detail_divider' />

                    </Grid>

                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} textAlign='right'>
                        <FaSwimmingPool style={{ fontSize: 35 }} />
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        Pool
                        <Typography variant='h5' fontSize={15} fontWeight={'bold'}>{data?.poolName}</Typography>
                        <Divider className='ssc_detail_divider' />

                    </Grid>

                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} textAlign='right'>
                        <BsFillPersonCheckFill style={{ fontSize: 35 }} />
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        Stand by
                        <Typography variant='h5' fontSize={15} fontWeight={'bold'}>{data?.standByName}</Typography>
                        <Divider className='ssc_detail_divider' />

                    </Grid>

                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} textAlign='right'>
                        <MdEditNote style={{ fontSize: 35 }} />
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        Remark
                        <Typography variant='h5' fontSize={15} fontWeight={'bold'}>{data?.remark}</Typography>
                        <Divider className='ssc_detail_divider' />

                    </Grid>

                    <Grid item xs={7} sm={7} md={9} lg={9} xl={9}>

                    </Grid>

                    <Grid item xs={5} sm={5} md={3} lg={3} xl={3}>
                        {
                            data?.createdAt >= moment().format('YYYY-MM-DD') ?
                                <>
                                    <LoadingButton
                                        startIcon={<IoMdTrash />}
                                        style={{ width: '100%' }}
                                        size='large' variant='contained'
                                        className='ssc_text_field'
                                        disableElevation
                                        color='error'
                                        loading={loading}
                                        // onClick={() => deleteData({ sd_id: data?.sd_id })}
                                        onClick={() => setOpenConfirm(true)}
                                    >
                                        Remove
                                    </LoadingButton>
                                </> : null
                        }


                    </Grid>


                </Grid>
            </PrimaryModal>
        </>
    )
}

export default ScheduleDetail