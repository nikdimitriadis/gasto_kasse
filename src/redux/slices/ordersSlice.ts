import { createSlice, PayloadAction,/*createAsyncThunk*/ } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import {initialStateOrders,orderedObj,Product,  QtyProduct } from '../../models/productsModels';

// test asThunk
import { socket } from '../../App';

const initialState: initialStateOrders = {
    orders: {
        time: "",
        date: "",
        id: "",
        orders: [],
        totalOrderedPrice: 0
    },
    historyOrders: [],
    dayRevenue: 0,
    barista: {
        activeOrders:{}
    }
   
}
// ! edw tha einai stin vasi p tha stelnei tis paragkelies kai tha ta diavazei to allo frontend
// export  const getTodos = createAsyncThunk<Todo[]>(
//     "products/getTodos",
//     async()=>{
//      return await fetch('http://localhost:5000/products').then(res => res.json())
//     }
// ) 

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, {payload}: PayloadAction<Product>) =>{
            const newOrderedObj: QtyProduct = {...payload, quantity: 1, totalPrice: payload.price}
            if(state.orders.orders.length === 0){
                state.orders.orders.push(newOrderedObj)
            } else {
             const itemExists = state.orders.orders.findIndex(order => order.id === payload.id)
             if(itemExists === -1){
                newOrderedObj.quantity = 1
                state.orders.orders.push(newOrderedObj)
                return;
             }
                state.orders.orders[itemExists].quantity += 1
                state.orders.orders[itemExists].totalPrice += payload.price
             
            }
        },
        removeOrder: (state, {payload}: PayloadAction<{id: string, price: number}>) =>{
            if(state.orders.orders.length === 1 && state.orders.orders[0].quantity === 1 ){
                state.orders.orders = state.orders.orders.filter(order => order.id !== payload.id)
                return
            }
                const itemExists = state.orders.orders.findIndex(order => order.id === payload.id);
                if(state.orders.orders[itemExists].quantity === 1){
                    state.orders.orders = state.orders.orders.filter(order => order.id !== payload.id)
                    return
                }
                state.orders.orders[itemExists].quantity -= 1
                state.orders.orders[itemExists].totalPrice -= payload.price
        },
        addToHistory: (state) =>{
            const id =  Date.now().toString();
           state.orders.id = id 
           state.orders.time = new Date().toLocaleTimeString();
           state.orders.date = new Date().toDateString();
           state.historyOrders = [...state.historyOrders, {...state.orders}]
           state.barista.activeOrders[id] = {orderState: "uknown", products: [...state.orders.orders]} 
            socket.emit("baristaOrder", state.barista.activeOrders )
           state.orders.date = "";
           state.orders.time = "";
           state.orders.id = "";
           state.orders.totalOrderedPrice = 0;
           state.orders.orders = [];
        },
        removeFromHistory: (state, {payload}: PayloadAction<{listId: string, itemId: string, price: number}>) =>{
            const indexOfOrderList = state.historyOrders.findIndex(orders => orders.id === payload.listId) //pernw to index tou obj 
            if(state.historyOrders[indexOfOrderList].orders.length ===1 && state.historyOrders[indexOfOrderList].orders[0].quantity === 1){
                state.historyOrders  =state.historyOrders.filter(list => list.id !== payload.listId)
                // edw tha mpei to function gia na allazei to state tou modal klisimo
                return
            }

           const signleItemOfList = state.historyOrders[indexOfOrderList].orders.findIndex(item => item.id === payload.itemId); // vriskw to obj mesa stis listas to array
           if(state.historyOrders[indexOfOrderList].orders[signleItemOfList].quantity > 1){
            state.historyOrders[indexOfOrderList].orders[signleItemOfList].quantity -=1
            state.historyOrders[indexOfOrderList].orders[signleItemOfList].totalPrice -= payload.price 
            return
           }

           if(state.historyOrders[indexOfOrderList].orders[signleItemOfList].quantity === 1){
            state.historyOrders[indexOfOrderList].orders = state.historyOrders[indexOfOrderList].orders.filter(item => item.id !== payload.itemId)
           }
        },
        // ! prpei na valw kai ena function p tha vgazei oxi olokliri tin apodiksi ala ena sigkekrimeno item apo tin apodiksi
        totalOrderPriceAct: (state)=>{
             const totalPrice = state.orders.orders.reduce(
                (previousValue, currentValue) => previousValue + currentValue.totalPrice
                , 0)

                state.orders.totalOrderedPrice = +totalPrice.toFixed(2)
        },
        deleteFromBarista: (state,  {payload}: PayloadAction<{listId: string, productId: string}>)=>{

            if(state.barista.activeOrders[payload.listId].products.length === 1 && state.barista.activeOrders[payload.listId].products[0].quantity === 1 ){
                delete state.barista.activeOrders[payload.listId]
                return
            }

            const productIdInex = state.barista.activeOrders[payload.listId].products.findIndex(product => product.id === payload.productId)

            if(state.barista.activeOrders[payload.listId].products[productIdInex].quantity === 1){
                state.barista.activeOrders[payload.listId].products=  state.barista.activeOrders[payload.listId].products.filter(item => item.id !== payload.productId)
                return
            }

            state.barista.activeOrders[payload.listId].products[productIdInex].quantity -= 1
        }
    },
    // extraReducers: (builder)=>{
    //     builder.addCase(getTodos.fulfilled, (state,action: PayloadAction<Todo[]>)=>{
    //         state.todos = action.payload
    //     })} 
})

export const {addOrder,removeOrder,addToHistory,totalOrderPriceAct,removeFromHistory,deleteFromBarista } = ordersSlice.actions;

export const selectCount = (state: RootState) => state.orders

export default ordersSlice.reducer