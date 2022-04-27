import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Category, MainData } from "../../Interfaces/todoInteface";

const initialState: MainData = {
    fetched: false,
    mainData: []
}

export const getProducts = createAsyncThunk<Category[]>(
    "products/getProducts",
    async()=>{
        const response = await fetch('http://localhost:5000/products')
        const responseData = response.json();
        return responseData
    }
)



export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getProducts.fulfilled,(state, action: PayloadAction<Category[]>)=>{
            state.mainData = action.payload;
            state.fetched = true
        })
    }
})

// Leipoyn ta actions

export const selectProducts = (state: RootState) => state.products

export default productsSlice.reducer