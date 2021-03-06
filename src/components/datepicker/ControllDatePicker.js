import { TextField } from '@mui/material'
import React from 'react'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller } from 'react-hook-form'


function ControllDatePicker({ control, name, setValue, value, error, helperText,required,minDate }) {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value: changeValue } }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                        label="Date"
                        inputFormat="DD/MM/yyyy"
                        value={changeValue}
                        minDate={ minDate }
                        onAccept={(value)=> setValue(value) }
                        onChange={(value) => onChange(value) }
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

export default ControllDatePicker