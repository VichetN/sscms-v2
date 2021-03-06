import {TextField } from '@mui/material'
import React from 'react'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller } from 'react-hook-form'
import moment from 'moment';

function ControlMonthPicker({ control, name, setValue, value, error, helperText,required }) {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value: changeValue } }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                        label="Date"
                        views={['year','month']}
                        // inputFormat="DD/MM/yyyy"
                        value={value}
                        minDate={moment()}
                        onChange={(value) => {
                            setValue(value)
                            onChange(value)
                        }}
                        renderInput={(params) => (
                            <TextField style={{ width: '100%' }} {...params}
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

export default ControlMonthPicker