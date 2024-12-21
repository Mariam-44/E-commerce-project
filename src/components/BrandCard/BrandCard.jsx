import React from 'react';

export default function BrandCard({ brandInfo, onClick }) {
  const { image, name , slage } = brandInfo;

  return (
    <div
      className="col-span-3 shadow-md rounded-md overflow-hidden border border-transparent hover:border-primary-600 hover:shadow-md hover:shadow-primary-200 transition-all duration-300 cursor-pointer"
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
