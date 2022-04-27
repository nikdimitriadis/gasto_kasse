import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getProducts } from "../redux/slices/productsSlice"
import { Outlet } from "react-router"

import { /*Divider,*/ Grid } from "@mui/material"
import Ordered from "../components/Ordered"
import Calc from "../components/Calc"
import Footer from "../components/Footer"

const MainPage = () => {
    const products = useAppSelector(state => state.products)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!products.fetched) {
            dispatch(getProducts())
        }
    }, [dispatch, products.fetched])

    return (
        <Grid container alignItems="stretch" spacing={0.5}>
            <Grid item xs={7} sx={{ height: "95vh", padding: "1.5rem" }}>
                <Outlet />

            </Grid>
            <Grid item xs={5} >
                <Grid item xs={12} sx={{ height: "47.5vh", overflowY: "scroll" }}>
                    <Ordered />
                </Grid>
                <Grid item xs={12} sx={{ height: "47.5vh" }}>
                    <Calc />
                </Grid>
            </Grid>
            <Grid item xs={12} pt={1} alignItems="center">
                <Footer />
            </Grid>
        </Grid>
    )
}

export default MainPage