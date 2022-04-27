import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { removeFromHistory } from '../redux/slices/ordersSlice'

import NavigateBack from '../components/Navigate__Back/NavigateBack';
import BarComp from '../components/History/BarComp';
import { RemoveFromModal } from '../components/Buttons/IconDeleteButtons';


import { List, Typography, Grid, Divider, Modal, Box, ListItem, ListItemText, } from '@mui/material'

import { Ids, orderedObj } from '../Interfaces/todoInteface';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 750,
    height: 500,
    overflowY: "scroll",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const arrayBar = ['Date', "Time", "Order ID", "Products"]

export default function History() {
    const [open, setOpen] = useState(false);
    const [ordersModal, setOrders] = useState<orderedObj>({ date: "", id: "", orders: [], time: "", totalOrderedPrice: 0 });
    const historyOrders = useAppSelector(state => state.orders.historyOrders)
    // const dayRevenue = useAppSelector(state => state.orders.dayRevenue)
    const dispatch = useAppDispatch();

    // !
    const dataModalHandler = (products: orderedObj) => {
        setOrders(products)
        setOpen(true)
    }

    const removeFromReduxHistoryHandler = (ids: Ids) => {
        console.log(ids)
        dispatch(removeFromHistory(ids))

        let coppiedArr = [...ordersModal.orders]
        // vriskw to index tou obj to opoio einai na piraksw 
        const itemToDec = coppiedArr.findIndex(item => item.id === ids.itemId)
        // antigrafw t obj
        const objInOrders = { ...coppiedArr[itemToDec] }
        // pirazw oti xreiazete na alaxthei
        objInOrders.quantity = objInOrders.quantity - 1;
        objInOrders.totalPrice = objInOrders.totalPrice - ids.price;
        // to neo piragmeno obj to vazw mesa sto array
        coppiedArr[itemToDec] = objInOrders
        // gia na diagrafei to obj kai na min dixnei 0
        if (objInOrders.quantity === 0) {
            console.log(objInOrders.quantity)
            coppiedArr = coppiedArr.filter(item => item.id !== ids.itemId)
        }
        console.log(coppiedArr, ordersModal.orders);


        setOrders((prevData) => ({ ...prevData, orders: [...coppiedArr] }))
    }


    let content;
    console.log(historyOrders)
    console.log(ordersModal)
    if (historyOrders.length === 0) {
        content = <Grid item xs={12} textAlign="center" mt={2}> <Typography variant='h5' component="p">No orders for today</Typography></Grid>
    } else {
        content = <Grid container mt={3}>{historyOrders.map((order, i) => (<BarComp onClick={dataModalHandler} order={order} key={order.id} />
            // <>
            //     <Grid key={Math.random().toString() + 1} item xs={3} textAlign="center" mt={1}>
            //         <Typography variant='h5' component="p" color="primary">
            //             {order.date}
            //         </Typography>
            //     </Grid>
            //     <Grid key={Math.random().toString() + 2} item xs={3} textAlign="center" mt={1}>
            //         <Typography variant='h5' component="p" color="primary">
            //             {order.time}
            //         </Typography>
            //     </Grid>
            //     <Grid key={Math.random().toString() + 3} item xs={3} textAlign="center" mt={1}>
            //         <Typography variant='h5' component="p" color="primary">
            //             {order.id}
            //         </Typography>
            //     </Grid>
            //     <Grid key={Math.random().toString() + 4} item xs={3} textAlign="center" mt={1}>
            //         <Button variant="contained" color="success" onClick={dataModalHandler.bind(null, order)}>Show Products</Button>
            //     </Grid>
            // </>
        ))}</Grid>
    }

    return (
        <>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Products of Card
                    </Typography>
                    <List sx={{ width: '100%', maxHeight: "95%" }}
                    >
                        {ordersModal.orders?.map((order) => (
                            <div key={order?.id}>
                                <ListItem >
                                    <ListItemText primary={`Total Price: ${order?.totalPrice.toFixed(2)}$  | Qty: x${order?.quantity}`} />
                                    <ListItemText primary={order?.productName} />
                                    <RemoveFromModal onClick={removeFromReduxHistoryHandler} listId={ordersModal.id} itemId={order.id} price={order.price} />
                                </ListItem>
                                <Divider orientation="horizontal" variant="middle" />
                            </div>
                        ))}
                    </List>
                </Box>
            </Modal>
            <Grid container spacing={3} justifyContent="center" padding="1rem" sx={{ overflowY: "scroll", maxHeight: "100%" }}>

                <NavigateBack title="History" divider={true} />

                <Grid container justifyContent="center" alignItems="center" pt="1rem">
                    {arrayBar.map((sting, i) => {
                        let number = 1;
                        if (i === 3) number = 0;
                        return <Grid key={i} item xs={3} textAlign="center" sx={{ borderRight: number }}>
                            <Typography variant='h5' component="p">
                                {sting}
                            </Typography>
                        </Grid>
                    })}

                    {content}
                </Grid>
                {/* {dayRevenue} */}

            </Grid>
        </>
    )
}
