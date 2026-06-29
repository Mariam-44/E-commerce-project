const slideBanners = [
  {
   
    img: "https://i.pinimg.com/736x/64/8e/ea/648eeacc694bcd399bca9f7a23cc02dc.jpg",
  },
  {
    img: "https://i.pinimg.com/1200x/f8/05/31/f8053103e7d6c85c58b36d4c407e1370.jpg",
  },
  {
   
    img: "https://i.pinimg.com/736x/96/7b/59/967b59727b386f6d10bcf7b7481b1a7c.jpg",
  },
];


export default function HomeSlider() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 ">
      {/* Swipeable banner */}
      <div className="lg:col-span-12">
        <swiper-container
          loop="true"
          slides-per-view="1"
          autoplay-delay="3000"
          autoplay-disable-on-interaction="false"
        >
          {slideBanners.map((slide, i) => (
            <swiper-slide key={i}>
              <div className="relative overflow-hidden" style={{ height: "500px", width: "100%" }}>
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