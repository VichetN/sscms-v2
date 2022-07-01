import { Button, IconButton } from '@mui/material';
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';

function UserColumn() {

    let array = [
        { field: 'id', headerName: 'ID',width:100 },
        { field: 'firstName', headerName: 'First name',width:200  },
        { field: 'lastName', headerName: 'Last name', width:200 },
        {
            field: 'age',
            headerName: 'Age',
            // type: 'number',
            align:'left',
            width:100
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            filter: false,
            width:400,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },

        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            align:'center',
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