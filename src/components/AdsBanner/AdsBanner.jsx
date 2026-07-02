import React from 'react'
import adv1 from '../../assets/images/adv1.jpg'
import adv2 from '../../assets/images/adv2.jpg'
import adv from '../../assets/images/adv.jpg'

export default function AdsBanner() {
  const adBanners = [
    {
      id: 1,
      img: adv,
    },
    {
      id: 2,
      img: adv1,
    },
    {
      id: 3,
      img: adv2,
    },
  ];

  return (
    <>
      <section className="my-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adBanners.map((ad) => (
            <div
              key={ad.id}
              className="relative rounded-xl overflow-hidden h-[180px] sm:h-[220px] lg:h-[260px]"
            >
              <img
                src={ad.img}
                alt={ad.title || "Advertisement"}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}