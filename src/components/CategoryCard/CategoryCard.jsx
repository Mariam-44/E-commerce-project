import React from 'react'

export default function CategoryCard({ categoryInfo, onCategoryClick }) {
    const { image, name, _id } = categoryInfo;

    return (
      <div
        className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4 shadow-md rounded-md overflow-hidden border border-transparent hover:border-yellow-600/30 hover:shadow-md hover:shadow-yellow-200/30 transition-all duration-300 cursor-pointer"
        onClick={() => onCategoryClick(_id, name)} 
      >
        <img className="w-full h-80 object-cover" src={image} alt={name} />
        <div className="p-3">
          <h2 className="text-yellow-600 text-center text-xl font-semibold">{name}</h2>
        </div>
      </div>
    );
  
}
