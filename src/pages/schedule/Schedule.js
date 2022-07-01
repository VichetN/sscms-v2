import { Box, Button, Grid, IconButton, ListItemIcon, Menu, MenuItem, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs';
import { VscSettings } from 'react-icons/vsc';
import { PageTitle } from '../../components';
import CreateSchedule from './createSchedule/CreateSchedule';
import { getScheduleByMonth } from '../../hooks/db';
import { useRequest } from 'ahooks';
import moment from 'moment';
import ReactLoading from "react-loading";
import {GrSchedules} from 'react-icons/gr'
import { OpenSnackBar } from '../../hooks';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import { menuPaperProps } from '../../utils/function';
import { useNavigate } from 'react-router-dom';

//style
import './Schedule.scss';
import ScheduleDetail from './scheduleDetail/ScheduleDetail';


const ControlMenu = ({ handleNavigate }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // function handleClickDelete(id) {
    //     handleDelete({ sd_id: id })
    //     setAnchorEl(null);
    // };

    return (
        <>
          
            <IconButton
                sx={{ p: '10px' }}
                onClick={handleOpenMenu}
                aria-controls={`simple-menu`}
                aria-haspopup="true"
                aria-label="directions"
            >
                <VscSettings />
            </IconButton>

            <Menu
                // id={`account-menu-${rowData?.sd_id}`}
                anchorEl={anchorEl}
                PaperProps={menuPaperProps}
                open={openMenu}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleNavigate} key={'1'}>
                    <ListItemIcon>
                        <GrSchedules />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        Print
                    </Typography>
                </MenuItem>

            </Menu>
        </>
    )
}

function Schedule() {

    const navigate = useNavigate()

    const [snackBar, setSnackBar] = useState({
        open: false,
        message: '',
        variant: 'success'
    })

    const [openAdd, setOpenAdd] = useState(false)
    const [openDetailSchedule, setOpenDetailSchedule] = useState(false)
    const [dateFilter, setDateFilter] = useState(moment().format('YYYY-MM-DD'))

    const [detailData, setDetailData] = useState(null)

    const [dateToCreate, setDateToCreate] = useState(null)
    const [calendarData, setCalendarData] = useState([])

    const calendarRef = useRef()

    const { loading, run } = useRequest(getScheduleByMonth, {
        manual: true,
        onSuccess: (res) => {
            if (res) {
                setCalendarData([...res?.data?.map(e => ({ title: JSON.stringify(e), date: e?.createdAt }))])
                // setTableData(res)
            }
        },
        pollingInterval: 60000
    });

    // const { run: deleteData } = useRequest(deleteSchedule, {
    //     manual: true,
    //     onSuccess: (res) => {
    //         if (!res?.status) {
    //             setSnackBar({
    //                 open: true,
    //                 message: res?.message,
    //                 variant: 'error',
    //             })
    //             return
    //         }

    //         fetchData()
    //         setSnackBar({
    //             open: true,
    //             message: res?.message,
    //             variant: 'success',
    //         })
    //     },
    // });

    const fetchData = () => {
        run({ date: dateFilter })
    }

    const handleClickDate = (value) => {

        if(value?.dateStr < moment().format('YYYY-MM-DD')) return;

        setDateToCreate(moment(value?.dateStr))
        setOpenAdd(true)
        // console.log(value)
        // setSnackBar({
        //     message: value?.dateStr,
        //     open:true,
        //     variant:'info'
        // })
    }
    const handleEventClick = (clickInfo) => {
        const event = JSON.parse(clickInfo?.event?._def?.title)
        setDetailData(event)
        setOpenDetailSchedule(true)
    }

    const handleEvents = (events) => {
        // console.log(events,'event')
    }

    function renderEventContent(eventInfo) {
        const event = JSON.parse(eventInfo.event.title)
        return (
            <Stack className='ssc_event_content' direction={'column'}>
                <b>{event?.time}</b>
                <Typography className='ssc_event_title' paragraph={true}>{event?.studentName}</Typography>
            </Stack>
        )
    }

    const renderMoreContent = (more) => {
        return (
            <>
                <span className='ssc_schedule_badge'>{more?.shortText}</span> more
            </>
        )
    }

    useEffect(() => {
        fetchData()
    }, [ dateFilter])

    return (
        <>
            <CreateSchedule open={openAdd} setOpen={setOpenAdd} fetchData={fetchData} initialDate={dateToCreate} />
            <ScheduleDetail open={openDetailSchedule} setOpen={setOpenDetailSchedule} data={detailData} fetchData={fetchData} />

            <OpenSnackBar open={snackBar?.open} alertVariant={snackBar?.variant} message={snackBar?.message} setSnackBar={setSnackBar} />

            <Box className='ssc_user_container' style={{ padding: 25 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={7} lg={9}>
                        <PageTitle title={'Schedule'} />
                    </Grid>

                    <Grid item xs={12} sm={4} md={1} lg={1}>
                        <Paper
                            // component="form"
                            className='ssc_search_paper'
                            sx={{ p: '0px 4px', display: 'flex', alignItems: 'center',justifyContent:'center' }}
                        >
                            {/* <Box sx={{ p: '10px' }}>
                                <ImSearch />
                            </Box> */}
                            {/* <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search..."
                                inputProps={{ 'aria-label': 'search' }}
                            /> */}

                            {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
                            <ControlMenu handleNavigate={()=> navigate('/schedule/print')} />
                            
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={2}>
                        <Button
                            variant='contained'
                            disableElevation
                            size='large'
                            className='ssc_create_btn'
                            onClick={() => setOpenAdd(true)}
                            startIcon={<BsPlusCircleFill />}
                        >
                            Create
                        </Button>
                    </Grid>

                    {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center">
                            <Pagination page={page} color='primary' count={Math.ceil(tableData?.totalDoc / pageSize)} onChange={handlePageChange} />
                        </Stack>
                    </Grid> */}

                    <Grid item xs={12} sm={12} md={12} lg={12} className="ssc_container">

                        <Stack className='ssc_calendar_container'>
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                stickyHeaderDates={true}
                                weekends={true}
                                headerToolbar={{
                                    left: 'title',
                                    center: loading ? 'loadingContent' : null,
                                    right: 'today prev,next'
                                }}
                                ref={calendarRef}
                                customButtons={{
                                    loadingContent: {
                                        text: <ReactLoading type={'spin'} width={30} color="#aaa" />,
                                    }
                                }}
                                dateClick={handleClickDate}
                                // select={handleClickDate}
                                editable={false}
                                selectable={true}
                                moreLinkContent={renderMoreContent}
                                // selectMirror={true}
                                dayMaxEvents={true}
                                // dragScroll={false}
                                eventContent={renderEventContent} // custom render function
                                eventClick={handleEventClick}
                                eventsSet={handleEvents}
                                events={[...calendarData]}
                                datesSet={(args) => {
                                    setCalendarData([])

                                    let month = moment(moment(args?.start))?.startOf('M').format('YYYY-MM-DD');

                                    let startMonth = parseInt(moment(args?.start).format('MM'))
                                    let endMonth = parseInt(moment(args?.end).format('MM'))

                                    if((endMonth - startMonth) === 2 ){
                                        month = moment(moment(args?.start)).add(1, 'M')?.startOf('M').format('YYYY-MM-DD');
                                    }
                                    setDateFilter(month)
                                    
                                }}
                                timeZone='Asia/Phnom_Penh'
                            />
                        </Stack>
                    </Grid>


                </Grid>
            </Box>
        </>
    )
}

export default Schedule