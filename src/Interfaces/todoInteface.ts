
// to dlm MPOREI na ginei gia login kai logout
export interface DLM {
    checked: boolean
}

// gastro menu from backend

export interface Product {
    id: string,
    productName: string,
    price: number,
}

//! Product with quantity 
export interface QtyProduct {
    id: string,
    productName: string,
    price: number,
    totalPrice: number,
    quantity: number
}

export interface Category {
    id: string;
    category: string;
    products: Product[];
}

export interface MainData { 
    fetched: boolean,
   mainData: Category[]
}

// ORDERED

export interface orderedObj {
    time: string,
    date: string,
    id: string,
    orders: QtyProduct[]
     totalOrderedPrice: number,
}

export interface initialStateOrders {
    orders: orderedObj,
    historyOrders: orderedObj[],
    dayRevenue: number,
    barista: Barista
   
}

// History Page 

export interface HistoryObj {
    id:  string,
    index: number
    products: QtyProduct[]
}

export interface Ids {
    listId: string,
    itemId: string,
    price: number
}

// barista

export interface Barista {
    activeOrders: {
        [key: string] :{
            orderState: string,
            products: QtyProduct[]
        }
    }
}