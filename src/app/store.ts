import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from '../redux/slices/ordersSlice'
import modeReducer from '../redux/slices/authSlice'
import productsReducer from "../redux/slices/productsSlice";

export const store = configureStore({
    reducer:{
        orders: ordersReducer,
        auth: modeReducer,
        products: productsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
