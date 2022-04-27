
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getProducts } from '../redux/slices/productsSlice'

import Mainroutes from '../routes/Mainroutes'
import { Grid } from '@mui/material'
import Ordered from '../components/Ordered'
import Calc from '../components/Calc'
import Footer from '../components/Footer'


export default function PreApp() {
    const products = useAppSelector(state => state.products)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!products.fetched) {
            dispatch(getProducts())
        }
    }, [dispatch, products.fetched])

    return (
        <div></div>
        // <Grid container alignItems="stretch" spacing={0.5}>
        //     <Grid item xs={7} sx={{ border: 1, height: "95vh", padding: "1.5rem" }}>
        //         <Mainroutes />
        //     </Grid>
        //     <Grid item xs={5} >
        //         <Grid item xs={12} sx={{ border: 1, height: "47.5vh", overflowY: "scroll" }}>
        //             <Ordered />
        //         </Grid>
        //         <Grid item xs={12} sx={{ border: 1, height: "47.5vh" }}>
        //             <Calc />
        //         </Grid>
        //     </Grid>
        //     <Grid item xs={12}>
        //         <Footer />
        //     </Grid>
        // </Grid>
    )
}
