import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";

export default function HomeSlider() {
  return (
    <>
      <div className="grid grid-cols-12 pt-10">
        <div className="col-span-8 " >
          <swiper-container loop="true" >
            <swiper-slide >
              <img src={img3} alt="" style={{height : "575px"}} className="w-full  object-cover" />
            </swiper-slide>
            <swiper-slide >
              <img src={img3} alt="" style={{height : "575px"}} className="w-full object-cover" />
            </swiper-slide>
          </swiper-container>
        </div>
        <div className="col-span-4">
          <div className="">
            <img src={img2} alt="" className="w-full" />
          </div>
          <div className="">
            <img src={img1} alt="" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
