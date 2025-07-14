import { useContext } from "react";
import { CartContext } from "../context/CartContext";


const useCart = ()=>{
    const cartState = useContext(CartContext);
    return cartState;
}

export default useCart;