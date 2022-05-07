import { Product } from "../../models/productsModels"

export interface BaristaProps {
    onDelete: Function,
    listId : string,
      productId: string
}

export interface NumberCalcProps {
  onClick: Function,
  number : string,
    
}
export interface FooterProps {
  onClick: Function,
  navigate : string,
  title : string,
}
export interface OrderBtn {
  onClick: Function,
  id : string,
  price : number,
}
export interface DetailsBtn {
  onClick: Function,
  productName : string,
  price : number,
  item: Product
}

export interface DeleteModalBtn {
  onClick: Function,
  listId: string,
  itemId: string,
  price: number
}