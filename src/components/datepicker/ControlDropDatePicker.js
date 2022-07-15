import { TextField } from '@mui/material'
import React from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller } from 'react-hook-form'


function ControlDropDatePicker({ control, name, setValue, value, error, helperText,required,minDate }) {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value: changeValue } }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        label="Date"
                        inputFormat="DD/MM/yyyy"
                        value={value}
                        minDate={ minDate }
                        className='ssc_text_field'
                        onChange={(value) => {
                            setValue(value)
                            onChange(value)
                        }}
                        renderInput={(params) => (
                            <TextField style={{ width: '100%'}} {...params}
                                size='small'
                                error={error}
                                helperText={helperText}
                                required={required}
                                
                            />
                        )}
                    />
                </LocalizationProvider>
            )}
        />
    )
}

export default ControlDropDatePicker