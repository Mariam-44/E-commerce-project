import React, { useContext, useState , useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../components/Loading/Loading";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

export default function Cart() {
  const { getCartProduct, cartInfo, clearCart, applyCoupon } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState("");
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    getCartProduct();
  }, []);

  async function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    setApplying(true);
    const result = await applyCoupon({ couponName: couponCode.trim() });
    setApplying(false);
    if (result.success) {
      toast.success("Coupon applied!");
    } else {
      toast.error("Invalid or expired coupon");
    }
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <section className="container mx-auto px-3 py-8 h-screen">
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
                className="rounded text-sm py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <div className="mt-6 flex flex-col md:flex-row gap-8">
              {/* Left: items + coupon */}
              <div className="flex-grow md:w-2/3 border-r-2 border-gray-300 pr-14">
                <div className="flex flex-col">
                  {cartInfo.data.products.map((product) => (
                    <CartItem key={product._id} productInfo={product} />
                  ))}
                </div>

                <div className="flex items-end gap-3 mt-6">
                  <div className="flex-grow">
                    <label className="text-sm text-gray-500 block mb-2">
                      Have a coupon? Enter your code.
                    </label>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon code"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    disabled={applying}
                    className="border border-gray-300 px-4 py-2 text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    {applying ? "Applying..." : "Apply"}
                  </button>
                  <button
                    onClick={clearCart}
                    className="text-sm py-2 px-4 bg-red-700/80 hover:bg-red-600 text-white rounded"
                  >
                    <i className="fa-solid fa-trash-can pr-2"></i>Clear cart
                  </button>
                </div>
              </div>

              {/* Right: totals */}
              <div className="md:w-1/3">
                <h3 className="uppercase text-sm tracking-wide text-gray-500 font-semibold mb-4">
                  Cart Totals
                </h3>

                <div className="flex justify-between text-sm text-gray-500 py-2 border-b border-gray-200">
                  <span>Shipping (3-5 Business Days)</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 py-2 border-b border-gray-200">
                  <span>Tax</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 py-2 border-b border-gray-200">
                  <span>Subtotal</span>
                  <span>{cartInfo.data.totalCartPrice} L.E</span>
                </div>

                <div className="flex justify-between items-center py-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">
                    {cartInfo.data.totalCartPrice} L.E
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="block text-center bg-gray-900 hover:bg-gray-800 text-white uppercase text-sm tracking-wide py-3 mt-2"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/"
                  className="block text-center text-sm text-gray-500 mt-4 hover:text-gray-700"
                >
                  &lt; Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}