import { Autocomplete, TextField } from '@mui/material'
import { useRequest } from 'ahooks';
import React, { useState } from 'react'
import { getAllStudent } from '../../hooks/db';
import { Controller } from 'react-hook-form'

function SelectStudent({ control, name, setValue,value, error, helperText,required }) {

    const [dataSelect, setDataSelect] = useState([])
    const { loading } = useRequest(getAllStudent, {
        onSuccess: (res) => {
            if (res) {
                setDataSelect(res?.data?.map(e => ({
                    id: e?.id,
                    label: `(SSC${e?.id}) ${e?.st_name}`,
                    startDate: e?.start_date,
                    endDate: e?.end_date,
                    locationId: e?.location_id,
                    permission: e?.permission,
                    instructorId: e?.inst_id,
                    course_id: e?.course_id,
                    classType: e?.classType,
                    className: e?.className
                })))
            }
        }
    });

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value:changeValue } }) => (
                <Autocomplete
                    disablePortal
                    id="combo-box-student"
                    value={value}
                    onChange={(option, value) => {
                        setValue(value)
                        onChange(value)
                    }}
                    options={dataSelect}
                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                    getOptionLabel={(option) => option.label}
                    style={{ width: '100%' }}
                    loading={loading}
                    size='small'
                    renderInput={(params) => <TextField required={required} error={error} helperText={helperText} {...params} label="Student" />}
                />
            )
            }
            
        />
    )
}

export default SelectStudent