import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

export default function CategorySlider() {
  const [categories, setcategories] = useState(null);

  async function getcategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setcategories(data.data);
  }
  useEffect(() => {
    getcategories();
  }, []);
  return (
    <>
      {categories ? (
        <section>
          <h2 className="text-lg font-semibold pt-5 pb-3">Shop Popular Categories</h2>
          <swiper-container loop="true" slides-per-view={6}>
            {categories.map((category) => (
              <swiper-slide>
                <img
                  src={category.image}
                  className="w-full h-64 object-cover"
                  alt=""
                />
                <h3>{category.name}</h3>
              </swiper-slide>
            ))}
          </swiper-container>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
