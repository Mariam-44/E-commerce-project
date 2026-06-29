import { useContext } from "react";
import { WishlistContext } from "../../context/Wishlist.context";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function WishlistItem({ productInfo }) {
  const { removeProductFromWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  const { title, imageCover, category, _id, price } = productInfo;

  return (
    <div className="flex items-center gap-4 py-5 border-b border-gray-200">
      <button
        onClick={() => removeProductFromWishlist({ productId: _id })}
        className="text-gray-400 hover:text-red-600 transition-colors"
        aria-label="Remove item"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      <img
        src={imageCover}
        alt={title}
        className="w-16 h-16 object-cover rounded"
      />

      <div className="flex-grow">
        <h3 className="text-sm font-semibold text-gray-700">
          <Link to={`/product/${_id}`}>{title}</Link>
        </h3>
        <p className="text-xs text-gray-400">{category?.name}</p>
      </div>

      <span className="w-20 text-right text-sm font-semibold text-gray-800">
        {price} L.E
      </span>

      <button
        onClick={() => addProductToCart({ productId: _id })}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
        aria-label="Add to cart"
      >
        <i className="fa-solid fa-cart-plus text-sm"></i>
      </button>
    </div>
  );
}