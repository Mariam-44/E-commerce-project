import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";

export default function Home() {
  const [products, setProducts] = useState(null);

  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setProducts(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
    <Helmet>
      <title>Home Page</title>
    </Helmet>
    <HomeSlider/>
    <CategorySlider/>
      {products ? (
        <div className="grid grid-cols-12 gap-4 mt-10">
          {products.map((product) => (
            <Card productInfo={product} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
      
    </>
  );
}
