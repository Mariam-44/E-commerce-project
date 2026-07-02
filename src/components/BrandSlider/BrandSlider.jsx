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

  const breakpoints = JSON.stringify({
    320: { slidesPerView: 2, spaceBetween: 12 },
    480: { slidesPerView: 3, spaceBetween: 16 },
    768: { slidesPerView: 4, spaceBetween: 20 },
    1024: { slidesPerView: 5, spaceBetween: 24 },
    1280: { slidesPerView: 6, spaceBetween: 24 },
  });

  return (
    <>
      {brands ? (
        <section className="border-gray-100 bg-black/95">
          <swiper-container
            loop="true"
            slides-per-view={2}
            space-between={12}
            breakpoints={breakpoints}
            autoplay-delay={2000}
            autoplay-disable-on-interaction="false"
          >
            {brands.map((brand) => (
              <swiper-slide key={brand._id}>
                <div className="flex items-center justify-center py-2 px-4 cursor-pointer group">
                  <span
                    className="text-sm sm:text-base md:text-lg lg:text-xl font-black tracking-tight text-white/80 group-hover:text-yellow-700 transition-colors duration-200 select-none"
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