import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/Wishlist.context";
import { Heart } from 'lucide-react';

export default function Card({ productInfo }) {
  const {
    images,
    title,
    price,
    category,
    ratingsAverage,
    id,
    ratingsQuantity,
    sold,
  } = productInfo;
  const { addProductToWishlist } = useContext(WishlistContext);
  const { addProduct } = useContext(CartContext);

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsInWishlist(wishlist.includes(id));
  }, [id]);

  const handleWishlistClick = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updatedWishlist = isInWishlist
      ? wishlist.filter((pid) => pid !== id)
      : [...wishlist, id];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsInWishlist(!isInWishlist);
    addProductToWishlist({ productId: id });
  };

  const stars = Math.round(ratingsAverage);

  return (
    <div className="bg-gray-200/55 rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
      <div className="relative bg-gray-50">
        {sold > 2000 && (
          <span className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            New
          </span>
        )}

        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:scale-110 transition-transform duration-200"
        >
           <Heart className="w-4 h-4" style={{ color: isInWishlist ? "#ef4444" : "#4b5563" }} />
        </button>

        <Link to={`/product/${id}`}>
          <img
            src={images[0]}
            alt={title}
            className="w-full h-36 sm:h-48 md:h-60 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      <div className="p-3 sm:p-4 pb-1">
        <h2 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-1 leading-snug mb-2">
          {title}
        </h2>

        <span className="text-sm sm:text-base font-bold text-gray-900">${price}</span>

        <div className="flex items-center mb-3 justify-between">
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={`fa-solid fa-star text-xs ${
                  i < stars ? "text-yellow-400" : "text-gray-200"
                }`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">
              ({ratingsQuantity})
            </span>
          </div>

          <button
            onClick={() => addProduct({ productId: id })}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-yellow-700 transition-colors duration-200 hover:scale-110 transform"
          >
            <i className="fa-solid fa-cart-shopping text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
}