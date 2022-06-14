import { Box, Button, Container, Divider, Grid, Icon, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'
import { PageTitle } from '../../components';
import { BsPlusCircleFill } from 'react-icons/bs'
import { VscSettings } from 'react-icons/vsc'
import { ImSearch } from 'react-icons/im'
import { DataGrid } from '@mui/x-data-grid/DataGrid';

//style
import './User.scss';
import CreateUser from './modal/CreateUser';
import UserColumn from './tableColumn/UserColumn';

function User() {

    const [openAdd, setOpenAdd] = useState(false)

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 12, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 16, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        { id: 20, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 21, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 23, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 24, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 25, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 26, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 27, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 28, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 29, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    return (
        <>

            <CreateUser open={openAdd} setOpen={setOpenAdd} />

            <Box className='ssc_user_container' style={{padding:25}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={4} lg={7}>
                        <PageTitle title={'User'} />
                    </Grid>
                    {/* <Grid item xs={12} sm={0} md={0} lg={3}>
                    </Grid> */}
                    <Grid item xs={12} sm={4} md={4} lg={3}>
                        <Paper
                            // component="form"
                            className='ssc_search_paper'
                            sx={{ p: '0px 4px', display: 'flex', alignItems: 'center' }}
                        >
                            <Box sx={{ p: '10px' }}>
                                <ImSearch />
                            </Box>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search..."
                                inputProps={{ 'aria-label': 'search' }}
                            />

                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton sx={{ p: '10px' }} aria-label="directions">
                                <VscSettings />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={2}>
                        <Button
                            variant='contained'
                            disableElevation
                            size='large'
                            className='ssc_create_btn'
                            onClick={() => setOpenAdd(true)}
                        >
                            <BsPlusCircleFill />&nbsp;&nbsp;Create
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Container maxWidth="xl" className={'ssc_container'}>

                <Box className="ssc_data_table_container" >
                    {/* <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}

                    <DataGrid
                        rows={rows}
                        rowHeight={40}
                        pageSize={50}
                        headerHeight={50}
                        rowsPerPageOptions={[5]}
                        columns={UserColumn().map(column => ({
                            ...column,
                            cellClassName: ({ row }) => row?.id === 2 ? 'row-class' : '',
                        }))}
                        disableColumnFilter
                        disableColumnMenu
                        // disableColumnSelector
                        disableSelectionOnClick
                        // disableDensitySelector
                        sortingMode='server'
                        hideFooter
                        onSortModelChange={(model, detail) => {
                            console.log(detail, model)
                        }}
                    // loading={true}
                    checkboxSelection
                    />
                </Box>
            </Container>
        </>
    )
}

export default User