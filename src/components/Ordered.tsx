import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { removeOrder, totalOrderPriceAct } from '../redux/slices/ordersSlice';

import { OrderedXBtn } from './Buttons/IconDeleteButtons'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import IconButton from '@mui/material/IconButton';
// import ClearIcon from '@mui/icons-material/Clear';
import Divider from '@mui/material/Divider';

export default function Ordered() {
    const dispatch = useAppDispatch()
    const orders = useAppSelector(state => state.orders.orders.orders)
    // const orders1 = useAppSelector(state => state.orders.orders.totalOrderedPrice)
    const deleteOrderHandler = (obj: { id: string, price: number }) => {
        dispatch(removeOrder(obj))
        dispatch(totalOrderPriceAct())

    }

    return (
        <>

            <List sx={{ width: '100%', overflowY: "scroll", maxHeight: "95%" }}
            >
                {orders?.map((order) => (
                    <div key={order.id}>
                        <ListItem >
                            <ListItemText primary={`Price: ${order?.totalPrice.toFixed(2)}$`} />
                            <ListItemText primary={order?.productName} />
                            <ListItemText primary={`x${order?.quantity}`} />
                            <OrderedXBtn id={order?.id} price={order.price} onClick={deleteOrderHandler} />
                        </ListItem>
                        <Divider orientation="horizontal" variant="middle" />
                    </div>
                ))}
            </List>
        </>
    )
}
