import React from 'react'

export default function AdsBanner() {
  const adBanners = [
    {
      id: 1,
      img: "https://mma.prnasia.com/media/2994746/image1.jpg?p=distribution",
    },
    {
      id: 2,
      img: "https://i.pinimg.com/1200x/b4/6c/79/b46c79b816ca077b627dd734146cec0d.jpg",
    },
    {
      id: 3,
      img: "https://www.bgr.com/bgr/wp-content/uploads/2023/01/galaxy-s23-specs-leak-2.jpg",
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