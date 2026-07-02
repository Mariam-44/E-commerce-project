import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/Cart.context';

export default function BestSeller({ productInfo }) {
  const { images, title, price, ratingsAverage, ratingsQuantity, id, description } = productInfo;
  const { addProduct } = useContext(CartContext);

  return (
    <div className="flex gap-3 sm:gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 hover:shadow-md transition-shadow duration-300">

      <Link to={`/product/${id}`} className="shrink-0">
        <img
          src={images[0]}
          alt={title}
          className="w-24 h-28 sm:w-36 sm:h-44 md:w-44 md:h-56 rounded-xl bg-gray-50 object-cover"
        />
      </Link>

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <span className="inline-block bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
            Bestseller
          </span>
          <h2 className="text-sm font-bold text-gray-800 line-clamp-2 pt-2">{title}</h2>
          <p className="text-base font-bold text-gray-900 pt-3">${price}</p>

          <div className="flex items-center gap-1 my-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={`fa-solid fa-star text-xs ${
                  i < Math.round(ratingsAverage) ? "text-yellow-400" : "text-gray-200"
                }`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">({ratingsQuantity})</span>
          </div>

          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed hidden sm:block">
            {description?.slice(0, 60)}...
          </p>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => addProduct({ productId: id })}
            className="bg-gray-900 text-white text-xs font-semibold px-4 sm:px-5 py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-200"
          >
            Quick Add
          </button>
          <Link to={`/product/${id}`}>
            <i className="fa-solid fa-arrow-up-right-from-square text-gray-400 hover:text-gray-700 transition-colors duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}