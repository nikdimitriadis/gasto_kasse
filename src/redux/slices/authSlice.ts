import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// ! Authentication on 
// ! next step
const initialState = {
    // checked: true
}
export const dlmSlice = createSlice({
    name: 'mode',
    initialState,
    reducers:{},
    extraReducers: {}
})

export const selectCount = (state: RootState) => state.auth

export default dlmSlice.reducer