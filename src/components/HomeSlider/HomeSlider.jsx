import React from "react";
import Slide1 from "../../assets/images/Slide1.jpg";
import Slide2 from "../../assets/images/Slide2.jpg";
import Slide3 from "../../assets/images/Slide3.jpg";

const slideBanners = [
  {
    img: Slide1,
  },
  {
    img: Slide2,
  },
  {
    img: Slide3,
  },
];

export default function HomeSlider() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
  
      <div className="lg:col-span-12">
        <swiper-container
          loop="true"
          slides-per-view="1"
          autoplay-delay="3000"
          autoplay-disable-on-interaction="false"
        >
          {slideBanners.map((slide, i) => (
            <swiper-slide key={i}>
              <div className="relative overflow-hidden w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px]">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/40 to-transparent" />
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </div>
  );
}