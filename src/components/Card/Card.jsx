import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/Wishlist.context";

export default function Card({ productInfo }) {
  const { images, title, price, category, ratingsAverage, id } = productInfo;
  const { addProductToWishlist } = useContext(WishlistContext);
  const { addProduct } = useContext(CartContext);

  const [isInWishlist, setIsInWishlist] = useState(false);
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsInWishlist(wishlist.includes(id));
  }, [id]);

  const handleWishlistClick = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let updatedWishlist;

    if (isInWishlist) {
      updatedWishlist = wishlist.filter((productId) => productId !== id);
    } else {
      updatedWishlist = [...wishlist, id];
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsInWishlist(!isInWishlist);

    addProductToWishlist({ productId: id });
  };

  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg rounded-md overflow-hidden">
      <div className="relative">
        <img src={images[0]} alt="" />
        <div className="layer opacity-0 hover:opacity-100 transition-opacity duration-300 flex gap-2 justify-center items-center absolute w-full h-full left-0 top-0 bg-black bg-opacity-15">
          <div
            onClick={() => {
              addProduct({ productId: id });
            }}
            className="icon hover:scale-110 transition-transform duration-300 hover:rotate-6 w-10 h-10 cursor-pointer rounded-full bg-primary-500 text-sm text-white flex items-center justify-center"
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <Link
            to={`/product/${id}`}
            className="icon hover:scale-110 transition-transform duration-300 hover:rotate-6 w-10 h-10 cursor-pointer rounded-full bg-primary-500 text-sm text-white flex items-center justify-center"
          >
            <i className="fa-solid fa-eye"></i>
          </Link>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-primary-500">{category.name}</h3>
            <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>
          </div>
          <div
            className="cursor-pointer"
            onClick={handleWishlistClick}
          >
            <i
              className="fa-solid fa-heart text-xl"
              style={{ color: isInWishlist ? "#ff0000" : "#808080" }} // Red if added, gray otherwise
            ></i>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span>{price} L.E</span>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-star text-yellow-500"></i>
            <span>{ratingsAverage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
