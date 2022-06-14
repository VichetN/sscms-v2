import { Button, IconButton } from '@mui/material';
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';

function UserColumn() {

    let array = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'firstName', headerName: 'First name', flex: 1 },
        { field: 'lastName', headerName: 'Last name', flex: 1 },
        {
            field: 'age',
            headerName: 'Age',
            // type: 'number',
            flex: 1,
            align:'left'
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 1,
            filter: false,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },

        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            align:'center',
            // flex: 1,
            width:100,
            filter: false,
            renderCell: (params) => {
                return (
                    <IconButton color="primary" component="span">
                        <BsThreeDotsVertical />
                    </IconButton>
                )
            }
        },
    ];

    return array
}

export default UserColumn