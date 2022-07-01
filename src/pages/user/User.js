import { Box, Button, Divider, Grid, IconButton, InputBase, Paper } from '@mui/material'
import React, { useState } from 'react'
import { PageTitle } from '../../components';
import { BsPlusCircleFill } from 'react-icons/bs'
import { VscSettings } from 'react-icons/vsc'
import { ImSearch } from 'react-icons/im'
import { Cell, Column, HeaderCell, Table } from "rsuite-table";

//style
import './User.scss';
import CreateUser from './modal/CreateUser';


const d = [{
    "id": 1,
    "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/justinrob/128.jpg",
    "city": "New Amieshire",
    "email": "Leora13@yahoo.com",
    "firstName": "Ernest Schuppe SchuppeSchuppeSchuppeSchuppeSchuppeSchuppe Schuppe",
    "lastName": "Schuppe",
    "street": "Ratke Port",
    "zipCode": "17026-3154",
    "date": "2016-09-23T07:57:40.195Z",
    "bs": "global drive functionalities",
    "catchPhrase": "Intuitive impactful software",
    "companyName": "Lebsack - Nicolas",
    "words": "saepe et omnis",
    "sentence": "Quos aut sunt id nihil qui.",
    "stars": 820,
    "followers": 70
}
    ,
{
    "id": 2,
    "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/thaisselenator_/128.jpg",
    "city": "New Gust",
    "email": "Mose_Gerhold51@yahoo.com",
    "firstName": "Janis",
    "lastName": "Vandervort",
    "street": "Dickinson Keys",
    "zipCode": "43767",
    "date": "2017-03-06T09:59:12.551Z",
    "bs": "e-business maximize bandwidth",
    "catchPhrase": "De-engineered discrete secured line",
    "companyName": "Glover - Hermiston",
    "words": "deleniti dolor nihil",
    "sentence": "Illo quidem libero corporis laborum.",
    "stars": 1200,
    "followers": 170
},
{
    "id": 3,
    "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
    "city": "Lefflerstad",
    "email": "Frieda.Sauer61@gmail.com",
    "firstName": "Makenzie",
    "lastName": "Bode",
    "street": "Legros Divide",
    "zipCode": "54812",
    "date": "2016-12-08T13:44:26.557Z",
    "bs": "plug-and-play e-enable content",
    "catchPhrase": "Ergonomic 6th generation challenge",
    "companyName": "Williamson - Kassulke",
    "words": "quidem earum magnam",
    "sentence": "Nam qui perferendis ut rem vitae saepe.",
    "stars": 610,
    "followers": 170
},
{
    "id": 3,
    "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
    "city": "Lefflerstad",
    "email": "Frieda.Sauer61@gmail.com",
    "firstName": "Makenzie",
    "lastName": "Bode",
    "street": "Legros Divide",
    "zipCode": "54812",
    "date": "2016-12-08T13:44:26.557Z",
    "bs": "plug-and-play e-enable content",
    "catchPhrase": "Ergonomic 6th generation challenge",
    "companyName": "Williamson - Kassulke",
    "words": "quidem earum magnam",
    "sentence": "Nam qui perferendis ut rem vitae saepe.",
    "stars": 610,
    "followers": 170
},
{
    "id": 3,
    "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
    "city": "Lefflerstad",
    "email": "Frieda.Sauer61@gmail.com",
    "firstName": "Makenzie",
    "lastName": "Bode",
    "street": "Legros Divide",
    "zipCode": "54812",
    "date": "2016-12-08T13:44:26.557Z",
    "bs": "plug-and-play e-enable content",
    "catchPhrase": "Ergonomic 6th generation challenge",
    "companyName": "Williamson - Kassulke",
    "words": "quidem earum magnam",
    "sentence": "Nam qui perferendis ut rem vitae saepe.",
    "stars": 610,
    "followers": 170
},
{
    "id": 3,
    "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
    "city": "Lefflerstad",
    "email": "Frieda.Sauer61@gmail.com",
    "firstName": "Makenzie",
    "lastName": "Bode",
    "street": "Legros Divide",
    "zipCode": "54812",
    "date": "2016-12-08T13:44:26.557Z",
    "bs": "plug-and-play e-enable content",
    "catchPhrase": "Ergonomic 6th generation challenge",
    "companyName": "Williamson - Kassulke",
    "words": "quidem earum magnam",
    "sentence": "Nam qui perferendis ut rem vitae saepe.",
    "stars": 610,
    "followers": 170
},
{
    "id": 3,
    "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
    "city": "Lefflerstad",
    "email": "Frieda.Sauer61@gmail.com",
    "firstName": "Makenzie",
    "lastName": "Bode",
    "street": "Legros Divide",
    "zipCode": "54812",
    "date": "2016-12-08T13:44:26.557Z",
    "bs": "plug-and-play e-enable content",
    "catchPhrase": "Ergonomic 6th generation challenge",
    "companyName": "Williamson - Kassulke",
    "words": "quidem earum magnam",
    "sentence": "Nam qui perferendis ut rem vitae saepe.",
    "stars": 610,
    "followers": 170
},
{
    "id": 3,
    "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
    "city": "Lefflerstad",
    "email": "Frieda.Sauer61@gmail.com",
    "firstName": "Makenzie",
    "lastName": "Bode",
    "street": "Legros Divide",
    "zipCode": "54812",
    "date": "2016-12-08T13:44:26.557Z",
    "bs": "plug-and-play e-enable content",
    "catchPhrase": "Ergonomic 6th generation challenge",
    "companyName": "Williamson - Kassulke",
    "words": "quidem earum magnam",
    "sentence": "Nam qui perferendis ut rem vitae saepe.",
    "stars": 610,
    "followers": 170
},
{
    "id": 3,
    "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
    "city": "Lefflerstad",
    "email": "Frieda.Sauer61@gmail.com",
    "firstName": "Makenzie",
    "lastName": "Bode",
    "street": "Legros Divide",
    "zipCode": "54812",
    "date": "2016-12-08T13:44:26.557Z",
    "bs": "plug-and-play e-enable content",
    "catchPhrase": "Ergonomic 6th generation challenge",
    "companyName": "Williamson - Kassulke",
    "words": "quidem earum magnam",
    "sentence": "Nam qui perferendis ut rem vitae saepe.",
    "stars": 610,
    "followers": 170
},
{
    "id": 3,
    "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
    "city": "Lefflerstad",
    "email": "Frieda.Sauer61@gmail.com",
    "firstName": "Makenzie",
    "lastName": "Bode",
    "street": "Legros Divide",
    "zipCode": "54812",
    "date": "2016-12-08T13:44:26.557Z",
    "bs": "plug-and-play e-enable content",
    "catchPhrase": "Ergonomic 6th generation challenge",
    "companyName": "Williamson - Kassulke",
    "words": "quidem earum magnam",
    "sentence": "Nam qui perferendis ut rem vitae saepe.",
    "stars": 610,
    "followers": 170
},
{
    "id": 3,
    "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
    "city": "Lefflerstad",
    "email": "Frieda.Sauer61@gmail.com",
    "firstName": "Makenzie",
    "lastName": "Bode",
    "street": "Legros Divide",
    "zipCode": "54812",
    "date": "2016-12-08T13:44:26.557Z",
    "bs": "plug-and-play e-enable content",
    "catchPhrase": "Ergonomic 6th generation challenge",
    "companyName": "Williamson - Kassulke",
    "words": "quidem earum magnam",
    "sentence": "Nam qui perferendis ut rem vitae saepe.",
    "stars": 610,
    "followers": 170
},
{
    "id": 3,
    "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
    "city": "Lefflerstad",
    "email": "Frieda.Sauer61@gmail.com",
    "firstName": "Makenzie",
    "lastName": "Bode",
    "street": "Legros Divide",
    "zipCode": "54812",
    "date": "2016-12-08T13:44:26.557Z",
    "bs": "plug-and-play e-enable content",
    "catchPhrase": "Ergonomic 6th generation challenge",
    "companyName": "Williamson - Kassulke",
    "words": "quidem earum magnam",
    "sentence": "Nam qui perferendis ut rem vitae saepe.",
    "stars": 610,
    "followers": 170
},
{
    "id": 3,
    "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
    "city": "Lefflerstad",
    "email": "Frieda.Sauer61@gmail.com",
    "firstName": "Makenzie",
    "lastName": "Bode",
    "street": "Legros Divide",
    "zipCode": "54812",
    "date": "2016-12-08T13:44:26.557Z",
    "bs": "plug-and-play e-enable content",
    "catchPhrase": "Ergonomic 6th generation challenge",
    "companyName": "Williamson - Kassulke",
    "words": "quidem earum magnam",
    "sentence": "Nam qui perferendis ut rem vitae saepe.",
    "stars": 610,
    "followers": 170
}

]


function User() {

    const [openAdd, setOpenAdd] = useState(false)

    return (
        <>

            <CreateUser open={openAdd} setOpen={setOpenAdd} />

            <Box className='ssc_user_container' style={{ padding: 25 }}>
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
                            size='small'
                            className='ssc_create_btn'
                            startIcon={<BsPlusCircleFill />}
                            onClick={() => setOpenAdd(true)}
                        >
                            Create
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} className="ssc_container">
                        <Box className="ssc_data_table_container" >
                            <Table data={d} fillHeight bordered cellBordered hover onSortColumn={(key, type) => console.log(key, type)}>
                                <Column width={100} >
                                    <HeaderCell>ID</HeaderCell>
                                    <Cell dataKey="id" />
                                </Column>
                                <Column width={150} >
                                    <HeaderCell>First Name</HeaderCell>
                                    <Cell dataKey="firstName" />
                                </Column>
                                <Column width={150} >
                                    <HeaderCell>Last Name</HeaderCell>
                                    <Cell dataKey="lastName" />
                                </Column>
                                <Column width={200} sortable>
                                    <HeaderCell>City</HeaderCell>
                                    <Cell dataKey="city" />
                                </Column>
                                <Column width={300} sortable={true} >
                                    <HeaderCell>Street</HeaderCell>
                                    <Cell dataKey="street" />
                                </Column>
                                <Column width={300} >
                                    <HeaderCell>Company Name</HeaderCell>
                                    <Cell dataKey="companyName" />
                                </Column>
                                <Column width={200} >
                                    <HeaderCell>Email</HeaderCell>
                                    <Cell dataKey="email" />
                                </Column>
                                <Column width={120} fixed="right">
                                    <HeaderCell>Action</HeaderCell>
                                    <Cell>
                                        {(rowData) => {
                                            function handleAction() {
                                                alert(`id:${rowData.id}`);
                                            }
                                            return (
                                                <span>
                                                    <b onClick={handleAction}>
                                                        {" "}
                                                        <b>Edit</b>{" "}
                                                    </b>{" "}
                                                    |
                                                    <b onClick={handleAction}>
                                                        {" "}
                                                        <b>Remove</b>{" "}
                                                    </b>
                                                </span>
                                            );
                                        }}
                                    </Cell>
                                </Column>
                            </Table>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {/* <Container maxWidth="xl" className={'ssc_container'}>

            </Container> */}
        </>
    )
}

export default User