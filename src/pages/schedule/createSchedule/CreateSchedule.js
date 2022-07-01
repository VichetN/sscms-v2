import { Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { BsCalendarPlus } from 'react-icons/bs'
import { useRequest } from 'ahooks';
import React, { useEffect, useState } from 'react'
import { ControllDatePicker, PrimaryModal, SelectInstructor, SelectPool, SelectStudent, SelectTime } from '../../../components';
import { createSchedule } from '../../../hooks/db';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { IoCloseCircle } from 'react-icons/io5'
import * as yup from 'yup'

import moment from 'moment';
import { OpenSnackBar } from '../../../hooks';

const initialState = {
    invoiceNumber: "",
    studentId: null,
    registerDate: null,
    expireDate: null,
    poolId: null,
    isAllowPhoto: 0,
    instructorId: 0,
    standById: null,
    createdAt: moment(),
    classType: '',
    time: null,
    remark: '',
}

const schema = yup.object({
    studentId: yup.object().nullable().required('Student is required!'),
    invoiceNumber: yup.string().required('Invoice ID is required'),
    poolId: yup.object().nullable().required('Pool is required!'),
    createdAt: yup.date().required('Date is required!'),
    time: yup.object().nullable().required('Time is required!'),
    standById: yup.object().nullable().required('Stand by is required!')
}).required()

function CreateSchedule({ setOpen, open, fetchData, initialDate }) {

    const [snackBar, setSnackBar] = useState({
        open: false,
        message: '',
        variant: 'success'
    })

    const [formData, setFormData] = useState({ ...initialState })
    const { control, register, reset, handleSubmit, formState: { errors },setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { ...initialState}
    })

    const { loading, run } = useRequest(createSchedule, {
        manual: true,
        onSuccess: (data) => {
            if (data) {
                fetchData()
                setFormData({ ...initialState })
                reset()
                setOpen(false)

                setSnackBar({
                    open: true,
                    message: 'Created successfully!',
                    variant: 'success',
                })
            }
        }
    })

    useEffect(()=>{
        if(initialDate){
            setFormData({ ...initialState, createdAt: initialDate })
            setValue("createdAt",initialDate)
        }
    },[initialDate])

    const onSubmit = (data) => {
        run({
            ...data,
            studentId: data?.studentId?.id,
            registerDate: moment(data?.studentId?.startDate).format('YYYY-MM-DD'),
            expireDate: moment(data?.studentId?.endDate).format('YYYY-MM-DD'),
            isAllowPhoto: data?.studentId?.permission === 'Yes' ? 1 : 0,
            poolId: data?.poolId?.id,
            time: data?.time?.value,
            standById: data?.standById?.id,
            createdAt: moment(data?.createdAt).format('YYYY-MM-DD')
        })
    }

    const handleSelectStudent = (e) => {
        setFormData({ ...formData, studentId: e })
    }
    const handleSelectPool = (e) => {
        setFormData({ ...formData, poolId: e })
    }
    const handleSelectCreatedAt = (e) => {
        setFormData({ ...formData, createdAt: moment(e) })
    }
    const handleSelectTime = (e) => {
        setFormData({ ...formData, time: e })
    }
    const handleSelectStandBy = (e) => {
        setFormData({ ...formData, standById: e })
    }

    return (
        <>
            <OpenSnackBar open={snackBar?.open} alertVariant={snackBar?.variant} message={snackBar?.message} setSnackBar={setSnackBar} />
            <PrimaryModal open={open} setOpen={setOpen} >

                <Grid container spacing={2}>

                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <Typography variant="h5" gutterBottom component="div">
                            <BsCalendarPlus /> Add Schedule
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom component="div">
                            Complete required field to add.
                        </Typography>
                    </Grid>

                    <Grid item xs={2} sm={2} md={2} lg={2} >
                        <Stack direction={'row'} justifyContent='flex-end' alignItems={'center'}>
                            <IconButton color='error' onClick={()=> setOpen(false)}>
                                <IoCloseCircle />
                            </IconButton>
                        </Stack>

                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <SelectStudent
                            name={'studentId'}
                            control={control}
                            required={true}
                            error={!!errors?.studentId}
                            helperText={<span>{errors?.studentId?.message}</span>}
                            value={formData?.studentId}
                            setValue={handleSelectStudent}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            error={!!errors?.invoiceNumber}
                            helperText={<span>{errors?.invoiceNumber?.message}</span>}
                            style={{ width: '100%' }}
                            value={formData.invoiceNumber}
                            required
                            label="Invoice ID"
                            {...register('invoiceNumber', {
                                onChange: (value) => setFormData({ ...formData, invoiceNumber: value.target.value })
                            })}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <SelectPool
                            name={'poolId'}
                            control={control}
                            required={true}
                            error={!!errors?.poolId}
                            helperText={<span>{errors?.poolId?.message}</span>}
                            value={formData.poolId}
                            setValue={handleSelectPool}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <ControllDatePicker
                            name={'createdAt'}
                            control={control}
                            required={true}
                            minDate={moment()}
                            error={!!errors?.createdAt}
                            helperText={<span>{errors?.createdAt?.message}</span>}
                            value={formData?.createdAt}
                            setValue={handleSelectCreatedAt}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <SelectTime
                            name={'time'}
                            control={control}
                            required={true}
                            error={!!errors?.time}
                            helperText={<span>{errors?.time?.message}</span>}
                            value={formData.time}
                            setValue={handleSelectTime}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <SelectInstructor
                            name={'standById'}
                            label={'Stand by'}
                            control={control}
                            required={true}
                            error={!!errors?.standById}
                            helperText={<span>{errors?.standById?.message}</span>}
                            value={formData?.standById}
                            setValue={handleSelectStandBy}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            multiline
                            rows={6}
                            placeholder="remark..."
                            error={!!errors?.remark}
                            helperText={<span>{errors?.remark?.message}</span>}
                            style={{ width: '100%' }}
                            value={formData.remark}
                            label={null}
                            {...register('remark', {
                                onChange: (value) => setFormData({ ...formData, remark: value.target.value })
                            })}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <LoadingButton style={{ width: '100%' }} size='large' variant='contained' disableElevation loading={loading} onClick={handleSubmit(onSubmit)} >Save</LoadingButton>
                    </Grid>
                </Grid>

            </PrimaryModal>
        </>
    )
}

export default CreateSchedule