import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { DLM } from "../../Interfaces/todoInteface";

const initialState: DLM = {
    checked: true
}
// ! next step
export const dlmSlice = createSlice({
    name: 'mode',
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