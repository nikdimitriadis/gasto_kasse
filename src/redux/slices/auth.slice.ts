import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";


const initialState: any = {
    // islL    
}
// ! next step
export const dlmSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        changeMode: (state)=>{
           state.checked = !state.checked
        }
    }
})

export const {changeMode} = dlmSlice.actions;

export const selectCount = (state: RootState) => state.mode.checked

export default dlmSlice.reducer