import { Box, Grid, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import calculateAge from 'calculate-age'

//style
import './PrintContent.scss';
import { BiCalendarExclamation } from 'react-icons/bi';

const RowData = ({ data, className }) => {

    const age = data?.dob ? new calculateAge(data?.dob, moment().format('YYYY-MM-DD')).getObject() : null

    return (
        <tr className={className}>
            <td>{data?.no}</td>
            <td>{data?.invoiceNumber}</td>
            <td>{data?.studentName}</td>
            <td> {age?.years ? `${age?.years}` : null}</td>
            <td>{moment(data?.dob).format('DD-MMM-YYYY')}</td>
            <td>{data?.tel}</td>
            <td>{data?.registerDate !== '0000-00-00' && moment(data?.registerDate).format('DD-MMM-YYYY')}</td>
            <td>{data?.expireDate !== '0000-00-00' && moment(data?.expireDate).format('DD-MMM-YYYY')}</td>
            <td>{data?.time}</td>
            <td>{data?.classType}</td>
            <td>{data?.instructName}</td>
            <td>{data?.standByName}</td>
            <td>{data?.isAllowPhoto === '1' ? 'YES' : 'NO'}</td>
            <td>{data?.remark}</td>
        </tr>
    )
}

function PrintContent({ printRef, printData }) {

    const printDataArr = printData?.data

    return (
        <>
            <Box ref={printRef} >
                {
                    printDataArr?.map((print, index) => {
                        const printNo = print?.data?.map((e, index) => ({ ...e, no: index + 1 }))
                        const indoorData = printNo?.filter(e => e?.classType !== 'Private (Outdoor)')
                        const outdoorData = printNo?.filter(e => e?.classType === 'Private (Outdoor)')
                        return (
                            <Box key={index} className="ssc_print_schedule" >

                                <Grid container spacing={2}>
                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        Location <Typography variant='h5' fontSize={15} fontWeight={'bold'}>{print?.location}</Typography>
                                    </Grid>

                                    <Grid item xs={8} sm={8} md={8} lg={8}>
                                        Pool <Typography variant='h5' fontSize={15} fontWeight={'bold'}>{print?.poolName}</Typography>
                                    </Grid>

                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        Date <Typography variant='h5' fontSize={15} fontWeight={'bold'}>{print?.date && moment(print?.date).format('DD-MMM-YYYY')}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <table className='print_schedule_table'>
                                            <thead>
                                                <tr>
                                                    <th>N°</th>
                                                    <th>Invoice</th>
                                                    <th>Name</th>
                                                    <th>Age</th>
                                                    <th>DOB</th>
                                                    <th>Tel</th>
                                                    <th>Regist</th>
                                                    <th>Expired</th>
                                                    <th>Time</th>
                                                    <th>Class type</th>
                                                    <th>Instructor</th>
                                                    <th>Stand by</th>
                                                    <th>Photo</th>
                                                    <th>Remark</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    printNo?.length > 0 ?
                                                        <>
                                                            {
                                                                indoorData?.map((e, index) => (
                                                                    <RowData data={e} key={index} />
                                                                ))
                                                            }
                                                            {
                                                                outdoorData?.map((e, index) => (
                                                                    <RowData data={e} key={index} className='ssc_row_print_outdoor' />
                                                                ))
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            <tr>
                                                                <td colSpan={14} style={{color:'#dddddd'}}>
                                                                    <Typography><BiCalendarExclamation style={{fontSize:30}} /></Typography> 
                                                                    <Typography>No schedule</Typography>
                                                                </td>
                                                            </tr>
                                                        </>

                                                }

                                            </tbody>
                                        </table>
                                    </Grid>

                                </Grid>

                            </Box>
                        )
                    })
                }
            </Box>
        </>
    )
}

export default PrintContent