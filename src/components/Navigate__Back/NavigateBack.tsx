import React from 'react'
import { useNavigate } from 'react-router'

import { Grid, Button, Typography, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const NavigateBack: React.FC<{ title: string, divider?: boolean }> = ({ title, divider }) => {
    const navigate = useNavigate()
    return (
        <>
            <Grid item xs={1}>
                <Button onClick={() => { navigate(-1) }} color="secondary" variant="contained" startIcon={<ArrowBackIcon />}>Back</Button>
            </Grid>
            <Grid item xs={11}>
                <Typography variant="h4" textAlign="center" color="secondary" >{title}</Typography>
                {divider && <Divider />}
            </Grid>
        </>
    )
}

export default NavigateBack