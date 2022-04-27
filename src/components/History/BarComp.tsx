import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { orderedObj } from '../../Interfaces/todoInteface'

const BarComp: React.FC<{ order: orderedObj, onClick: Function }> = ({ onClick, order }) => {
    const showProductsHandler = () => {
        onClick(order)
    }

    return (
        <>
            <Grid item xs={3} textAlign="center" mt={1}>
                <Typography variant='h5' component="p" color="primary">
                    {order.date}
                </Typography>
            </Grid>
            <Grid item xs={3} textAlign="center" mt={1}>
                <Typography variant='h5' component="p" color="primary">
                    {order.time}
                </Typography>
            </Grid>
            <Grid item xs={3} textAlign="center" mt={1}>
                <Typography variant='h5' component="p" color="primary">
                    {order.id}
                </Typography>
            </Grid>
            <Grid item xs={3} textAlign="center" mt={1}>
                <Button variant="contained" color="success" onClick={showProductsHandler}>Show Products</Button>
            </Grid>
        </>
    )
}

export default BarComp