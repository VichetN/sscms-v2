import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { timeSelect } from '../../utils/function'

function SelectTime({ control, name, setValue,value, error, helperText,required }) {

    const time = timeSelect()

    let dataSelect = time?.map(e => ({label:e,value:e}))

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
                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                    getOptionLabel={(option) => option.label}
                    style={{ width: '100%' }}
                    size='small'
                    renderInput={(params) => <TextField required={required} error={error} helperText={helperText} {...params} label="Time" />}
                />
            )
            }
            
        />
    )
}

export default SelectTime