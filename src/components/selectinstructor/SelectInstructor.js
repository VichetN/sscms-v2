import { Autocomplete, TextField } from '@mui/material'
import { useRequest } from 'ahooks';
import React, { useState } from 'react'
import { getAllInstructor } from '../../hooks/db';
import { Controller } from 'react-hook-form'

function SelectInstructor({ control, name, setValue,value, error, helperText,required,label }) {

    const [dataSelect, setDataSelect] = useState([])
    const { loading } = useRequest(getAllInstructor, {
        onSuccess: (res) => {
            if (res?.status) {
                setDataSelect(res?.data?.map(e => ({
                    id: e?.id,
                    label: e?.name,
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
                    className='ssc_text_field'
                    options={dataSelect}
                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                    getOptionLabel={(option) => option.label}
                    style={{ width: '100%' }}
                    loading={loading}
                    size='small'
                    renderInput={(params) => <TextField required={required} error={error} helperText={helperText} {...params} label={label} />}
                />
            )
            }
            
        />
    )
}

export default SelectInstructor