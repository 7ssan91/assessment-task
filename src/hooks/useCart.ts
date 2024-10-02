import { useContext } from "react";
import {
  CartContext,
  DECREASE_ITEM_QUANTITY,
  INCREASE_ITEM_QUANTITY,
  REMOVE_ITEM,
  SET_CART_ITEMS_DATA,
} from "../context/CartContext";
import { formatHttpError } from "../clients";
interface AddToCartParams {
  basketItems?: string;
  cakeMessage?: string;
  product: any;
  qty?: number;
}
interface CartHookInterface {
  addItemsToCart: (params: AddToCartParams) => Promise<any>;
  increaseItemQuantity: (productId: number) => void;
  decreaseItemQuantity: (productId: number) => void;
  removeItem: (productId: number) => void;
}
export const useCart = (): CartHookInterface => {
  const { cartState, cartDispatch } = useContext(CartContext);
  const addItemsToCart = async ({ product, qty = 1 }: AddToCartParams) => {
    const payload = {
      qty,
      product,
      proId: product.id,
    };

    cartDispatch({ type: SET_CART_ITEMS_DATA, payload });

    try {
    } catch (error: any) {
      return formatHttpError(error);
    }
  };
  const increaseItemQuantity = (productId: number) => {
    cartDispatch({ type: INCREASE_ITEM_QUANTITY, payload: { productId } });
  };

  const decreaseItemQuantity = (productId: number) => {
    cartDispatch({ type: DECREASE_ITEM_QUANTITY, payload: { productId } });
  };
  const removeItem = (productId: number) => {
    cartDispatch({ type: REMOVE_ITEM, payload: { productId } });
  };
  return {
    addItemsToCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
  };
};
