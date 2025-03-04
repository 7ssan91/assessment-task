import React, { useContext } from "react";
import { ProductList } from "../components/UI/ProductList";
import { CardBanner } from "../components/UI/CardBanner";
import banners from "../constants/banners.json";
import { useInView } from "react-intersection-observer";
import { Banner } from "../components/UI/Banner/Banner";
import { CartContext } from "../context/CartContext";

interface HomeProps {}
const Home: React.FC<HomeProps> = () => {
  const [bannerRef, bannerInView] = useInView({ threshold: 0.8 });
  const { cartState, cartDispatch } = useContext(CartContext);
  console.log(cartState);

  return (
    <>
      <div className="bg-[#F8F8FB] overflow-hidden">
        <div ref={bannerRef} className="mx-auto w-full">
          <Banner />
        </div>
      </div>
      <div className="bg-white container mx-auto">
        {/* Product list component */}
        <div className="py-10">
          <ProductList />
        </div>

        {/* Card Banner component */}
        {banners?.length && (
          <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <CardBanner itemList={banners} />
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
