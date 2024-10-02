import React, { createContext, useReducer } from "react";

export interface CartStateProps {
  cartCount?: number;
  cartListItems: any[] | null;
  isLoading: boolean;
}

export interface CartActionProps {
  type: string;
  payload?: any;
}

export const defaultCartContext: CartStateProps = {
  cartCount: 0,
  cartListItems: [],
  isLoading: true,
};

export const SET_IS_CART_LOADING = "SET_IS_CART_LOADING";
export const SET_CART_DATA = "SET_CART_DATA";
export const SET_CART_ITEMS_DATA = "SET_CART_ITEMS_DATA";
export const REMOVE_ITEM_PROCESSING = "REMOVE_ITEM_PROCESSING";
export const INCREASE_ITEM_QUANTITY = "INCREASE_ITEM_QUANTITY";
export const DECREASE_ITEM_QUANTITY = "DECREASE_ITEM_QUANTITY";
export const REMOVE_ITEM = "REMOVE_ITEM";

export const CartContext = createContext<any>(defaultCartContext);

export const cartReducer = (
  state: CartStateProps,
  action: CartActionProps
): any => {
  switch (action.type) {
    case SET_CART_ITEMS_DATA:
      const existingProductIndex = state?.cartListItems?.findIndex(
        (item) => item.proId === action.payload.proId
      );

      // If the product already exists, update its quantity
      if (existingProductIndex !== -1) {
        return {
          ...state,
          cartListItems: state?.cartListItems?.map((item, index) => {
            if (index === existingProductIndex) {
              return {
                ...item,
                qty: item.qty + action.payload.qty, // Update the quantity
              };
            }
            return item;
          }),
        };
      }

      // If the product doesn't exist, add it to the cart
      return {
        ...state,
        cartListItems: [...(state?.cartListItems || []), action.payload],
      };

    case INCREASE_ITEM_QUANTITY:
      return {
        ...state,
        cartListItems: state.cartListItems?.map((item) => {
          if (item.proId === action.payload.productId) {
            return { ...item, qty: item?.qty + 1 };
          }
          return item;
        }),
      };
    case DECREASE_ITEM_QUANTITY:
      return {
        ...state,
        cartListItems: state.cartListItems
          ?.map((item) => {
            // Decrease the quantity if the product ID matches
            if (item.proId === action.payload.productId) {
              return { ...item, qty: item.qty - 1 };
            }
            return item;
          })
          // Remove items where the quantity is 0
          .filter((item) => item.qty > 0),
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartListItems: state.cartListItems?.filter(
          (item) => item.proId !== action.payload?.productId
        ),
      };
    case SET_IS_CART_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export const CartContextProvider: React.FC<{ children?: React.ReactNode }> = (
  props
) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartContext);
  const cartConfig = {
    cartState,
    cartDispatch,
  };

  return (
    <CartContext.Provider value={cartConfig}>
      {props.children}
    </CartContext.Provider>
  );
};
