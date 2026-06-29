import React, { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  const { count, price, product } = productInfo;
  const { title, imageCover, category, id } = product;
  const { removeFromCart, updateProductCount } = useContext(CartContext);

  const lineTotal = price * count;

  return (
    <div className="flex items-center gap-4 py-5 border-b border-gray-200">
      <button
        onClick={() => removeFromCart({ productId: id })}
        className="text-gray-400 hover:text-gray-700 transition-colors"
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
        <h3 className="text-sm font-semibold text-gray-700 line-clamp-2 pb-1">
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>
        <p className="text-xs text-gray-400 ">{category?.name}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            count > 1 && updateProductCount({ productId: id, count: count - 1 })
          }
          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40"
          disabled={count <= 1}
        >
          <i className="fa-solid fa-minus text-[10px]"></i>
        </button>

        <span className="w-4 text-center text-sm">{count}</span>

        <button
          onClick={() => updateProductCount({ productId: id, count: count + 1 })}
          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
        >
          <i className="fa-solid fa-plus text-[10px]"></i>
        </button>
      </div>

      <span className="w-20 text-right text-sm font-semibold text-gray-800">
        {lineTotal} L.E
      </span>
    </div>
  );
}