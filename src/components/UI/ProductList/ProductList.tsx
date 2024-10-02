import React, { useState, useRef, useContext } from "react";
import styles from "./ProductList.module.css";
import products from "../../../constants/products.json";
import { twMerge } from "tailwind-merge";
import { useCart } from "../../../hooks/useCart";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartContext } from "../../../context/CartContext";
import ProductListItem from "./ProductListItem";

export const ProductList = () => {
  const { addItemsToCart } = useCart();
  const [isSending, setIsSending] = useState<number | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const cartIconRef = useRef<HTMLDivElement>(null); // ref to cart icon
  const router = useRouter();
  const { cartState } = useContext(CartContext);
  const { locale: activeLocale } = router;

  const handleAddToCart = (product: any) => {
    const buttonElement = document.getElementById(`add-to-cart-${product.id}`);

    // Get cart icon's position
    const cartIcon = cartIconRef.current?.getBoundingClientRect();

    if (buttonElement && cartIcon) {
      // Get button position
      const buttonPosition = buttonElement.getBoundingClientRect();

      const translateX = cartIcon.left - buttonPosition.left;
      const translateY = cartIcon.top - buttonPosition.top;

      // Trigger the "send to cart" animation
      setIsSending(product.id);

      // Animate towards cart icon
      buttonElement.style.transition = "transform 1s ease";
      buttonElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.5)`;

      setTimeout(() => {
        // Reset button position after animation
        buttonElement.style.transform = "none";
        setIsSending(null); // Stop the animation
        addItemsToCart({ product });

        // Trigger the shake animation for the cart
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 500); // Shake for 500ms
      }, 1000); // 1-second delay for the animation
    }
  };

  return (
    <div className="container mx-auto pt-4">
      {/* Cart Icon with Shake Animation */}
      <div
        id="cart"
        ref={cartIconRef}
        className={twMerge(
          styles["cart-icon"],
          isShaking ? styles["shake"] : ""
        )}
        data-total-items={cartState?.cartListItems?.length}
      >
        <Link href={`${activeLocale}/cart`}>🛒</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product: any) => (
          <ProductListItem
            product={product}
            isSending={isSending}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};
