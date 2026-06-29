import React, { useContext, useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";
import { WishlistContext } from "../../context/Wishlist.context";
import toast from "react-hot-toast";

const navLinks = [
  { label: "Home", to: "" },
  { label: "Products", to: "/Products" },
  { label: "Categories", to: "categories" },
  { label: "Brands", to: "/brands" },
  { label: "Orders", to: "/allorders", guarded: true },
];

export default function Navbar() {
  let { token, logout } = useContext(UserContext);
  const { cartInfo, getCartProduct } = useContext(CartContext);
  const { wishlistInfo, getWishlistProducts } = useContext(WishlistContext);

  useEffect(() => {
    if (token) getWishlistProducts();
  }, [token]);

  useEffect(() => {
    if (token) getCartProduct();
  }, [token]);

  const linkClass = ({ isActive }) =>
    `relative text-sm tracking-wide transition-colors duration-200 pb-0.5
     before:absolute before:left-0 before:-bottom-1 before:h-0.5 before:bg-yellow-500
     before:transition-[width] before:duration-300
     ${isActive
       ? "before:w-full text-gray-900 font-semibold"
       : "before:w-0 text-gray-400 hover:before:w-full hover:text-gray-700"
     }`;

  function requireAuth(e, action) {
    if (!token) {
      e.preventDefault();
      toast.error(`You must log in first to view your ${action}`);
    }
  }

  return (
    <nav className="bg-white backdrop-blur-md shadow-sm border-b border-gray-100 py-3 sticky top-0 z-50">
      <div className="container mx-auto flex items-center">

        {/* Logo — left */}
        <Link to="" className="shrink-0">
          <h1 className="text-xl font-bold text-gray-800">Fresh <span className="text-yellow-500">Cart</span></h1>
        </Link>

        {/* Nav links — always visible, centered with mx-auto */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 mx-auto">
          {navLinks.map(({ label, to, guarded }) => (
            <li key={label}>
              <NavLink
                className={linkClass}
                to={to}
                onClick={(e) => guarded && requireAuth(e, "orders")}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-5 ml-auto md:ml-0 shrink-0">
          {/* Cart — always visible */}
          <Link
            to="/cart"
            className="relative group"
            onClick={(e) => requireAuth(e, "cart")}
          >
            <i className="fa-solid fa-cart-shopping text-gray-700 group-hover:text-gray-700 text-base transition-colors duration-200" />
            {token && cartInfo?.numOfCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {cartInfo.numOfCartItems}
              </span>
            )}
          </Link>

          {/* Wishlist — always visible */}
          <Link
            to="/wishlist"
            className="relative group"
            onClick={(e) => requireAuth(e, "wishlist")}
          >
            <i className="fa-solid fa-heart text-gray-700 group-hover:text-rose-500 text-base transition-colors duration-200" />
            {token && wishlistInfo?.count > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {wishlistInfo.count}
              </span>
            )}
          </Link>

          {/* Divider */}
          <div className="w-px h-5 bg-gray-700" />

          {token ? (
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-red-500 transition-colors duration-200"
            >
              <i className="fa-solid fa-right-from-bracket text-base" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <ul className="flex items-center gap-3">
              <li>
                <NavLink
                  to="/login"
                  className="text-sm text-gray-700 hover:text-gray-800 transition-colors duration-200"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className="text-sm bg-yellow-500 text-white px-4 py-1.5 rounded-full hover:bg-yellow-600 transition-colors duration-200"
                >
                  Sign up
                </NavLink>
              </li>
            </ul>
          )}
        </div>

      </div>
    </nav>
  );
}