import { Autocomplete, TextField } from '@mui/material'
import { useRequest } from 'ahooks';
import React, { useState } from 'react'
import { getAllPool } from '../../hooks/db';
import { Controller } from 'react-hook-form'

function SelectPool({ control, name, setValue,value, error, helperText,required }) {
    const [dataSelect, setDataSelect] = useState([])
    const { loading } = useRequest(getAllPool, {
        onSuccess: (res) => {
            if (res) {
                setDataSelect(res?.data?.map(e => ({
                    id: e?.p_id,
                    label: e?.poolName,
                    locationId: e?.locationId,
                })))
            }
        }
    });

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value: changeValue } }) => (
                <Autocomplete
                    disablePortal
                    id="combo-box-pool"
                    value={value}
                    size="small"
                    options={dataSelect}
                    onChange={(option, value) => {
                        setValue(value)
                        onChange(value)
                    }}
                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                    getOptionLabel={(option) => option.label}
                    style={{ width: '100%' }}
                    loading={loading}
                    renderInput={(params) => <TextField error={error} helperText={helperText} required={required} {...params} label="Pool" />}
                />
            )}
        />
    )
}

export default SelectPool