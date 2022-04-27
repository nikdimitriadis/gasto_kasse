import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { deleteFromBarista } from '../redux/slices/ordersSlice';

import { BaristaDeleteButton } from '../components/Buttons/IconDeleteButtons';

import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { socket } from '../App';

export default function Barista() {
    const dispatch = useAppDispatch()
    const orders = useAppSelector(state => state.orders.barista.activeOrders)

    const deleteOrderHandler = (item: string, productId: string) => {
        dispatch(deleteFromBarista({ listId: item, productId }))
        console.log(item, productId)
    }

    socket.on('baristaOrder', (data: any) => {
        console.log(data);
    })

    return (
        <>
            {Object.keys(orders).map((listId, idx) => (
                <Accordion key={listId} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Order number {idx + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {orders[listId].products.map(product => (
                            <Grid container key={product.id} textAlign="center">
                                <Grid item xs={3}>
                                    <Typography>{product.productName}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>{`x${product.quantity}`}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>{`${product.totalPrice}$`}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <BaristaDeleteButton listId={listId} productId={product.id} onDelete={deleteOrderHandler} />
                                </Grid>
                            </Grid>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}
