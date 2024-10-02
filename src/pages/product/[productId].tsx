import React from "react";
import { Button } from "../../components/UI/Button";
import { Product } from "../../components/UI/ProductList";
import { useCart } from "../../hooks/useCart";
import ReactImageMagnify from "react-image-magnify";
// use to read stream json file in server side
import fs from "fs";
import path from "path";

interface ProductProps {
  product: Product;
}

const ProductDetails: React.FC<ProductProps> = ({ product }) => {
  const { addItemsToCart } = useCart();
  const handleAddToCart = () => {
    addItemsToCart({ product });
  };
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: product?.name,
                  isFluidWidth: true,
                  src: product?.image,
                  width: 300, // Width of the small image
                },
                largeImage: {
                  src: product?.image,
                  width: 1200,
                  height: 1200,
                },

                shouldUsePositiveSpaceLens: true,
                enlargedImagePosition: "over",
                isHintEnabled: true,
                enlargedImageContainerDimensions: {
                  //scale image by 150%
                  width: "150%",
                  height: "150%",
                },
              }}
            />

            <div className="flex gap-4 py-4 justify-center overflow-x-auto"></div>
          </div>

          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{product?.name}</h2>
            <p className="text-gray-600 mb-4">SKU: {product?.sku}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">${product?.price}</span>
              <span className="text-gray-500 line-through">
                ${product?.originalPrice}
              </span>
            </div>
            <div className="flex items-center mb-4">
              {/* SVGs for rating */}
            </div>
            <p className="text-gray-700 mb-6">{product?.description}</p>

            <div className="flex space-x-4 mb-6 min-w-fit">
              <div className="w-full flex">
                <Button onClick={handleAddToCart}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getServerSideProps = async (cntx: any) => {
  const { productId } = cntx?.params;

  const filePath = path.join(process.cwd(), "./src/constants", "products.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const products = JSON.parse(jsonData);
  // Find the product by it's Id
  const product = products?.find((p: any) => p?.id === parseInt(productId));
  // return a 404 page
  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};
