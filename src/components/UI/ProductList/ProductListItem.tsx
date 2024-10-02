import React from "react";
import { twMerge } from "tailwind-merge";
import styles from "./ProductList.module.css";
import { ProductListItemProps } from "./ProductList.types";
import Link from "next/link";

const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  isSending,
  handleAddToCart,
}) => {
  return (
    <div
      key={`product-${product?.id}`}
      className="rounded-xl border border-[#EEEEEE] relative"
    >
      {/* Product Tag */}
      <div className="absolute top-2 left-8 transform -translate-x-1/2 flex flex-col items-center text-gray-500 font-semibold">
        <span className={twMerge("text-xs", styles["tag-label"])}>
          {product?.tag}
        </span>
      </div>

      {/* Product Image */}
      <Link href={`/product/${product?.id}`}>
        <img
          className="w-full object-cover rounded-t-xl"
          src={product?.image}
          alt={product?.name}
        />
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-gray-500 text-sm mb-1">{product.category}</div>
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center mt-1 mb-3">
          {[...Array(5)].map((_star, index) => (
            <svg
              key={index}
              className={twMerge(
                "w-4 h-4",
                index < product.rating ? "text-brand-100" : "text-gray-300"
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.978 2.887 1.518 4.673c.3.922-.755 1.688-1.54 1.11L10 14.347l-3.948 2.835c-.784.578-1.84-.188-1.54-1.11l1.518-4.673-3.978-2.887c-.783-.57-.381-1.81.588-1.81h4.91L9.05 2.927z" />
            </svg>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-800">
              ${product.price}
            </span>
            <span className="text-sm line-through text-gray-500 ml-2">
              ${product.originalPrice}
            </span>
          </div>
          <span className="text-sm text-gray-500">{product.quantity}</span>
        </div>

        {/* Add to Cart Button */}
        <div className="flex justify-between items-center mt-4">
          <button
            id={`add-to-cart-${product.id}`}
            className={twMerge(
              styles["add-to-cart-button"],
              isSending === product.id ? styles["sendtocart"] : ""
            )}
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
