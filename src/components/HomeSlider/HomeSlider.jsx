import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";

export default function HomeSlider() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 pt-10">
        {/* Slider on larger screens (8/12 columns) */}
        <div className="lg:col-span-8">
          <swiper-container
            loop="true"
            slides-per-view="1" // Ensure only 1 slide is visible at a time
            breakpoints={{
              // Responsive breakpoints for swiper
              320: {
                slidesPerView: 1, // 1 slide on mobile (default)
              },
              768: {
                slidesPerView: 1, // Still 1 slide on tablets (can be adjusted as needed)
              },
              1024: {
                slidesPerView: 1, // 1 slide on larger screens (change this if you want more than 1 slide)
              },
            }}
          >
            <swiper-slide>
              <img
                src={img3}
                alt="Slider Image 1"
                style={{ height: "575px" }}
                className="w-full object-cover"
              />
            </swiper-slide>
            <swiper-slide>
              <img
                src={img2}
                alt="Slider Image 2"
                style={{ height: "575px" }}
                className="w-full object-cover"
              />
            </swiper-slide>
            <swiper-slide>
              <img
                src={img1}
                alt="Slider Image 3"
                style={{ height: "575px" }}
                className="w-full object-cover"
              />
            </swiper-slide>
          </swiper-container>
        </div>

        {/* Images on the right on larger screens (4/12 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-0">
          {/* Hide on mobile (use lg:block to show only on larger screens) */}
          <div className="hidden lg:block w-full">
            <img src={img2} alt="Image 1" className="w-full object-cover" />
          </div>
          <div className="hidden lg:block w-full">
            <img src={img1} alt="Image 2" className="w-full object-cover" />
          </div>
        </div>
      </div>
    </>
  );
}
