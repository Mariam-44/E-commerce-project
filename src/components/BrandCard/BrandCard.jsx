import React from 'react';

export default function BrandCard({ brandInfo, onClick }) {
  const { image, name , slage } = brandInfo;

  return (
    <div
      className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4 shadow-md rounded-md overflow-hidden border border-transparent hover:border-yellow-600/30 hover:shadow-md hover:shadow-yellow-200/30 transition-all duration-300 cursor-pointer"
      onClick={onClick} 
    >
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt={name}
        />
      </div>
      <div className="p-3">
        <h2 className="text-black text-center font-semibold text-lg">{name}</h2>
      </div>
    </div>
  );
}
