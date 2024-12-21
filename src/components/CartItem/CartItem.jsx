import React, { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function CartItem({productInfo}) {
    const {count , price , product } = productInfo
    const {title , imageCover , category , id} = product
    let {removeFromCart,updateProductCount} = useContext(CartContext)
  return (
    <>
      <div className="flex gap-2">
        <div className="items flex grow bg-gray-100 py-4 px-6 rounded-lg justify-between items-center">
          <img
            src={imageCover}
            alt={title}
            className="w-24 h-24 object-cover rounded-full border-4 border-white"
          />

          <h3 className="text-lg font-semibold text-gray-700">
            <Link to={`/product/${id}`}> {title}</Link>
           </h3>
          <h4 className="font-semibold text-gray-500">{category.name}</h4>

          <div className="count flex items-center gap-5">
            <span>{count}</span>
            <div className="icons space-y-2 ">
              <div onClick={()=>{updateProductCount({productId : id , count : count+ 1 })}} className="plus w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center cursor-pointer">
                <i className="fa-solid fa-plus"></i>
              </div>
              <div onClick={()=>{updateProductCount({productId : id , count : count - 1 })}} className="minus w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center cursor-pointer">
                <i className="fa-solid fa-minus"></i>
              </div>
            </div>
          </div>

          <span>{price} L.E</span>
        </div>

        <button onClick={()=>{removeFromCart({productId : id})}} className="rounded-md p-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
          <i className="fa-solid fa-xmark "></i>
        </button>
      </div>
    </>
  );
}
