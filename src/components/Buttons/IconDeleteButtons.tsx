import React from 'react'
import { IconButton, Grid, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { BaristaProps, NumberCalcProps, FooterProps, OrderBtn, DetailsBtn, DeleteModalBtn } from './InterfacesButtonsProps';

export const BaristaDeleteButton: React.FC<BaristaProps> = ({ onDelete, listId, productId }) => {
    const deleteHandler = () => {
        onDelete(listId, productId)
    }
    return (
        <IconButton color="error" onClick={deleteHandler}>
            <ClearIcon />
        </IconButton>
    )
}



export const NumberCalcButton: React.FC<NumberCalcProps> = ({ onClick, number }) => {
    const numberHandler = () => {
        onClick(number)
    }
    return (
        <Grid xs={4} item >
            <Button sx={{ width: "100%", display: "block", padding: 1.5 }} color="primary" variant="contained" onClick={numberHandler}>{number}</Button>
        </Grid>
    )
}


export const FooterNavBtn: React.FC<FooterProps> = ({ onClick, navigate, title }) => {
    const navigateHandler = () => {
        onClick(navigate)
    }
    return (
        <Grid item xs={2} textAlign="center">
            <Button variant='contained' color='warning' /*endIcon={<RestaurantMenuIcon />}*/ onClick={navigateHandler}>{title}</Button>
        </Grid>
    )
}

export const OrderedXBtn: React.FC<OrderBtn> = ({ onClick, id, price }) => {
    const deleteHandler = () => {
        onClick({ id, price })
    }
    return (
        <IconButton color="error" onClick={deleteHandler}>
            <ClearIcon />
        </IconButton>
    )
}

export const AllCatBtn: React.FC<FooterProps> = ({ onClick, navigate, title }) => {
    const navigateHandler = () => {
        onClick(`home/${navigate}`)
    }
    return (
        <Grid xs={6} lg={4} item textAlign="center">
            <Button sx={{ width: "100%" }} size="large" variant="contained" onClick={navigateHandler}>{title}</Button>
        </Grid>
    )
}

export const DetailsCatBtn: React.FC<DetailsBtn> = ({ onClick, item, productName, price }) => {
    const orderHandler = () => {
        onClick(item)
    }
    return (
        <Grid xs={6} lg={4} item textAlign="center">
            <Button sx={{ width: "100%" }} size="large" color="secondary" variant="contained" onClick={orderHandler}>{productName} {price}$</Button>
        </Grid>
    )
}

export const RemoveFromModal: React.FC<DeleteModalBtn> = ({ onClick, listId, itemId, price }) => {
    const removeFromModalHandler = () => {
        onClick({ listId, itemId, price })
    }
    return (
        <IconButton color="error" onClick={removeFromModalHandler}>
            <ClearIcon />
        </IconButton>
    )
}
