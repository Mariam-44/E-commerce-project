import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

export default function BrandSlider() {
  const [brands, setBrands] = useState(null);

  async function getBrands() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setBrands(data.data);
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      {brands ? (
        <section className="border-gray-100 bg-black/95">
          <swiper-container
            loop="true"
            slides-per-view={6}
            space-between={24}
            autoplay-delay={2000}
            autoplay-disable-on-interaction="false"
          >
            {brands.map((brand) => (
              <swiper-slide key={brand._id}>
                <div className="flex items-center justify-center pt-2 px-4 cursor-pointer group">
                  <span
                    className="text-xl font-black tracking-tight text-white/80 group-hover:text-yellow-700 transition-colors duration-200 select-none"
                    style={{ fontFamily: "'Arial Black', sans-serif" }}
                  >
                    {brand.name}
                  </span>
                </div>
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