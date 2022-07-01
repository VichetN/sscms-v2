import { Box, Button, Divider, Grid, IconButton, InputBase, ListItemIcon, Menu, MenuItem, Paper, Stack, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import moment from 'moment';
import React, { useRef, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsPlusCircleFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { IoMdTrash } from 'react-icons/io';
import { VscSettings } from 'react-icons/vsc';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import { ControllDatePicker, ControlMonthPicker, PageTitle, SelectPool } from '../../components';
import { menuPaperProps } from '../../utils/function';
import { deleteSchedule, getScheduleByMonth, getScheduleByMonthPool, getSchedulePaginator } from '../../hooks/db';
import calculateAge from 'calculate-age'
import { FiRefreshCw } from 'react-icons/fi'

//style
import './PrintSchedule.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { LoadingButton } from '@mui/lab';
import { RiPrinterFill } from 'react-icons/ri';
import ReactToPrint from 'react-to-print';
import PrintContent from './printContent/PrintContent';

const initialState = {
    poolId: null,
    date: moment()
}

const schema = yup.object({
    poolId: yup.object().nullable().required('Please select pool!'),
    date: yup.date().nullable().required('Please select date!')
})

const ControlMenu = ({ rowData, handleDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function handleClickDelete(id) {
        handleDelete({ sd_id: id })
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                onClick={handleOpenMenu}
                aria-controls={`simple-menu`}
                aria-haspopup="true"
            // aria-expanded={openMenu ? 'true' : undefined}
            >
                <BiDotsVerticalRounded />
            </IconButton>

            <Menu
                id={`account-menu-${rowData?.sd_id}`}
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
                <MenuItem onClick={() => handleClickDelete(rowData?.sd_id)} key={rowData?.sd_id}>
                    <ListItemIcon>
                        <IoMdTrash />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        Remove
                    </Typography>
                </MenuItem>

            </Menu>
        </>
    )
}

function PrintSchedule() {

    const [openAdd, setOpenAdd] = useState(false)
    const [tableData, setTableData] = useState(null)
    const [formData, setFormData] = useState({ ...initialState })

    const printRef = useRef()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { ...initialState }
    })

    const { loading, run } = useRequest(getScheduleByMonthPool, {
        manual: true,
        onSuccess: (res) => {
            if (res) {
                // setCalendarData([...res?.data?.map(e => ({ title: JSON.stringify(e), date: e?.createdAt }))])
                setTableData(res)
            }
        },
    });

    const onSubmit = (data) => {

        run({
            ...data,
            poolId: data?.poolId?.id,
            date: moment(data?.date).format('YYYY-MM-DD')
        })
    }

    const handleSelectPool = (e) => {
        setFormData({ ...formData, poolId: e })
    }
    const handleSelectMonth = (e) => {
        setFormData({ ...formData, date: e })
    }

    return (
        <>
            <Box className='ssc_user_container' style={{ padding: 25 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <PageTitle title={'Print Schedule'} />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
                        <ControllDatePicker
                            name={'date'}
                            control={control}
                            required={true}
                            error={!!errors?.date}
                            helperText={<span>{errors?.date?.message}</span>}
                            value={formData?.date}
                            setValue={handleSelectMonth}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>

                        <SelectPool
                            name={'poolId'}
                            control={control}
                            required={true}
                            error={!!errors?.poolId}
                            helperText={<span>{errors?.poolId?.message}</span>}
                            value={formData.poolId}
                            setValue={handleSelectPool}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={2} xl={1}>
                        <LoadingButton
                            // variant='contained'
                            disableElevation
                            loading={loading}
                            size='large'
                            className='ssc_create_btn'
                            onClick={handleSubmit(onSubmit)}
                            startIcon={<FiRefreshCw />}
                        >
                            Fetch
                        </LoadingButton>
                    </Grid>

                    <Grid item xs={12} sm={0} md={0} lg={2} xl={5}>

                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
                        <ReactToPrint
                            documentTitle={`Schedule ${tableData?.date ? ' - '+moment(tableData?.date).format('DD-MMM-YYYY'):'គ្មាន'} ${tableData?.poolName ? ' - '+ tableData?.poolName :'គ្មាន'}`}
                            trigger={() => <LoadingButton
                                variant='contained'
                                disableElevation
                                loading={loading}
                                disabled={ !tableData?.data?.length > 0 }
                                size='large'
                                className='ssc_create_btn'
                                startIcon={<RiPrinterFill />}
                            >
                                Print
                            </LoadingButton>
                            }
                            content={() => printRef.current}
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} className="ssc_container">
                        <PrintContent printRef={printRef} printData={tableData} />
                        {/* <Box className="ssc_data_table_container" >
                            <Table loading={loading} data={tableData?.data} fillHeight bordered cellBordered hover onSortColumn={(key, type) => console.log(key, type)}>
                                <Column width={100} >
                                    <HeaderCell>Date</HeaderCell>
                                    <Cell dataKey="createdAt" />
                                </Column>
                                <Column width={150} >
                                    <HeaderCell>Invoice ID</HeaderCell>
                                    <Cell dataKey="invoiceNumber" />
                                </Column>
                                <Column width={150} >
                                    <HeaderCell>Name</HeaderCell>
                                    <Cell dataKey="studentName" />
                                </Column>
                                <Column width={80} >
                                    <HeaderCell>Age</HeaderCell>
                                    <Cell>
                                        {(record) => {
                                            const age = record?.dob ? new calculateAge(record?.dob, moment().format('YYYY-MM-DD')).getObject() : null
                                            return (
                                                <Stack >
                                                    {age?.years ? `${age?.years}y` : null}
                                                </Stack>
                                            );
                                        }}
                                    </Cell>
                                </Column>
                                <Column width={150} >
                                    <HeaderCell>Dob</HeaderCell>
                                    <Cell dataKey="dob" />
                                </Column>
                                <Column width={150} >
                                    <HeaderCell>Tel</HeaderCell>
                                    <Cell dataKey="tel" />
                                </Column>
                                <Column width={150} >
                                    <HeaderCell>Regist</HeaderCell>
                                    <Cell dataKey="registerDate" />
                                </Column>
                                <Column width={150} >
                                    <HeaderCell>Expired</HeaderCell>
                                    <Cell dataKey="expireDate" />
                                </Column>
                                <Column width={150} >
                                    <HeaderCell>Time</HeaderCell>
                                    <Cell dataKey="time" />
                                </Column>
                                <Column width={200} >
                                    <HeaderCell>Class name</HeaderCell>
                                    <Cell dataKey="time" />
                                </Column>
                                <Column width={200} >
                                    <HeaderCell>Instructor</HeaderCell>
                                    <Cell dataKey="instructorName" />
                                </Column>
                                <Column width={200} >
                                    <HeaderCell>Stand By</HeaderCell>
                                    <Cell dataKey="standByName" />
                                </Column>
                                <Column width={60} fixed="right">
                                    <HeaderCell></HeaderCell>
                                    <Cell className='action_icons' dataKey='sd_id'>
                                        {(rowData) => {

                                            return (
                                                <>
                                                    <ControlMenu rowData={rowData} handleDelete={() => console.log('test')} />
                                                </>
                                            );
                                        }}
                                    </Cell>
                                </Column>
                            </Table>
                        </Box> */}

                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default PrintSchedule