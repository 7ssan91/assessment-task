import React from "react";
import { ProductList } from "../components/UI/ProductList";
import { CardBanner } from "../components/UI/CardBanner";
import banners from "../constants/banners.json";

interface HomeProps {}
const Home: React.FC<HomeProps> = () => {
  return (
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
  );
};
export default Home;
