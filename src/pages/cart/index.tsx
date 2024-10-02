import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useCart } from "../../hooks/useCart";
import Link from "next/link";

const CartPage: React.FC = () => {
  const { cartState } = useContext(CartContext);
  const { increaseItemQuantity, decreaseItemQuantity, removeItem } = useCart();
  const cartItems = cartState?.cartListItems ?? [];

  // Calculate the total amount
  const totalAmount = cartItems?.reduce(
    (total: number, item: any) => total + item?.product?.price * item?.qty,
    0
  );
  //decrease the quantity of the product
  const handleDecrement = (productId: number) => {
    decreaseItemQuantity(productId);
  };
  //increase the quantity of the product
  const handleIncrement = (productId: number) => {
    increaseItemQuantity(productId);
  };
  //remove product from the cart
  const handleRemove = (productId: number) => {
    removeItem(productId);
    // removeItemFromCart(productId);
  };
  return (
    <div className="container mx-auto pt-4">
      <h1 className="text-2xl font-bold my-6">Shopping Cart</h1>
      <div className="flex h-full flex-col overflow-y-scroll bg-white">
        <div className="flex-1 overflow-y-auto py-6 ">
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems?.map((item: any) => (
                  <li key={item.product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.product.name}</h3>
                          <p className="ml-4">
                            ${item.product.price * item?.qty}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.category}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500 border border-gray-500 px-2 py-1 rounded-md">
                          <button
                            onClick={() => {
                              handleDecrement(item.product.id);
                            }}
                            type="button"
                            className="font-medium text-black hover:text-brand-100"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.qty}</span>
                          <button
                            onClick={() => {
                              handleIncrement(item?.product?.id);
                            }}
                            type="button"
                            className="font-medium text-black hover:text-brand-100"
                          >
                            +
                          </button>
                        </p>
                        <div className="flex"></div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-black hover:text-brand-100"
                            onClick={() => {
                              removeItem(item?.product?.id);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200  py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </a>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link
                href="/"
                passHref
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
