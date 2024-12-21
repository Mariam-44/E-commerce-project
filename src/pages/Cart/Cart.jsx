import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../components/Loading/Loading";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { getCartProduct, cartInfo, clearCart } = useContext(CartContext);

  useEffect(() => {
   
    getCartProduct();
  }, []);

  return (
    <>
     <Helmet>
      <title>Cart</title>
    </Helmet>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <section>
          
          <div className="flex gap-2 items-center mt-5">
            <i className="fa-brands fa-opencart text-3xl pr-3"></i>
            <h2 className="text-xl pl-4 text-slate-600 font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">
              Your shopping cart
            </h2>
          </div>

          
          {cartInfo.numOfCartItems === 0 ? (
            <div className="mt-6 bg-gray-100 p-6 rounded-md shadow flex justify-center items-center flex-col gap-3">
              <h2>Your cart is empty. Click the button to start shopping</h2>
              <Link
                to="/"
                className="rounded text-sm py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <>
             
              <div className="space-y-2 mt-6">
                {cartInfo.data.products.map((product) => (
                  <CartItem key={product._id} productInfo={product} />
                ))}
              </div>

            
              <div className="pt-4 flex justify-between items-center">
                <p className="font-semibold">
                  Your Total Cart Price{" "}
                  <span className="text-primary-400">
                    {cartInfo.data.totalCartPrice}
                  </span>
                </p>
                <button
                  onClick={clearCart}
                  className="rounded text-sm py-2 px-4 bg-red-500 hover:bg-red-600 text-white"
                >
                  <i className="fa-solid fa-trash-can pr-2"></i>Clear cart
                </button>
              </div>

              
              <Link
                to="/checkout"
                className="btn bg-primary-400 hover:bg-primary-500 inline-block text-center mt-5 py-1"
              >
                Payment
              </Link>
            </>
          )}
        </section>
      )}
    </>
  );
}
