import { Box, Grid, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import calculateAge from 'calculate-age'

//style
import './PrintContent.scss';

function PrintContent({ printRef, printData }) {
    return (
        <>
            <Box className="ssc_print_schedule" ref={printRef} >

                <Grid container spacing={2}>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        Location <Typography variant='h5' fontSize={15} fontWeight={'bold'}>{printData?.location}</Typography>
                    </Grid>

                    <Grid item xs={8} sm={8} md={8} lg={8}>
                        Pool <Typography variant='h5' fontSize={15} fontWeight={'bold'}>{printData?.poolName}</Typography>
                    </Grid>

                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        Date <Typography variant='h5' fontSize={15} fontWeight={'bold'}>{printData?.date && moment(printData?.date).format('DD-MMM-YYYY')}</Typography>
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
                                    <th>Photo</th>
                                    <th>Remark</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    printData?.data?.map((e, index) => {
                                        const age = e?.dob ? new calculateAge(e?.dob, moment().format('YYYY-MM-DD')).getObject() : null
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{e?.invoiceNumber}</td>
                                                <td>{e?.studentName}</td>
                                                <td> {age?.years ? `${age?.years}` : null}</td>
                                                <td>{moment(e?.dob).format('DD-MMM-YYYY')}</td>
                                                <td>{e?.tel}</td>
                                                <td>{e?.registerDate !== '0000-00-00' && moment(e?.registerDate).format('DD-MMM-YYYY')}</td>
                                                <td>{e?.expireDate !== '0000-00-00' && moment(e?.expireDate).format('DD-MMM-YYYY')}</td>
                                                <td>{e?.time}</td>
                                                <td>{e?.isAllowPhoto === '1' ? 'YES':'NO'}</td>
                                                <td>{e?.remark}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </Grid>

                </Grid>

            </Box>
        </>
    )
}

export default PrintContent