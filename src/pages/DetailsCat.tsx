import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addOrder, totalOrderPriceAct } from "../redux/slices/ordersSlice";

import NavigateBack from "../components/Navigate__Back/NavigateBack";
import { DetailsCatBtn } from "../components/Buttons/IconDeleteButtons";


import { Grid } from "@mui/material";
import { Product } from '../models/productsModels'



export default function DetailsCat() {
    const dispatch = useAppDispatch()
    const cat = useParams().cat
    const products = useAppSelector(state => state.products);
    let content;
    let titleProd = "";

    const orderHandler = (item: Product) => {
        // ! alaki edw mporw na perasw to item apeuthias
        const orderedObj = {
            ...item,
            // id: Date.now().toString()
        }
        console.log(orderedObj)
        dispatch(addOrder(orderedObj))
        dispatch(totalOrderPriceAct())
    }

    content = <Grid item >Waiting...</Grid>
    if (products.fetched) {
        const data = products.mainData.filter(item => item.id === cat)
        titleProd = data[0].category
        content = data[0].products.map((item) => (
            <DetailsCatBtn key={item.id} onClick={orderHandler} item={item} productName={item.productName} price={item.price} />
        ))
    }

    return (

        <Grid container spacing={3} justifyContent="center" padding="1rem" height="100%" /*alignItems="center"*/ >
            <NavigateBack title={titleProd} />
            {content}
        </Grid>


    )
}
