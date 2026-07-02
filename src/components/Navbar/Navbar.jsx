import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";
import { WishlistContext } from "../../context/Wishlist.context";
import toast from "react-hot-toast";
import { Menu, X } from "lucide-react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (token) getWishlistProducts();
  }, [token]);

  useEffect(() => {
    if (token) getCartProduct();
  }, [token]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const linkClass = ({ isActive }) =>
    `relative text-sm tracking-wide transition-colors duration-200 pb-0.5
     before:absolute before:left-0 before:-bottom-1 before:h-0.5 before:bg-yellow-500
     before:transition-[width] before:duration-300
     ${isActive
       ? "before:w-full text-gray-900 font-semibold"
       : "before:w-0 text-gray-400 hover:before:w-full hover:text-gray-700"
     }`;

  const mobileLinkClass = ({ isActive }) =>
    `block py-3 px-4 rounded-lg text-base transition-colors duration-200 ${
      isActive ? "bg-yellow-50 text-gray-900 font-semibold" : "text-gray-600 hover:bg-gray-50"
    }`;

  function requireAuth(e, action) {
    if (!token) {
      e.preventDefault();
      toast.error(`You must log in first to view your ${action}`);
    }
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <nav className="bg-white backdrop-blur-md shadow-sm border-b border-gray-100 py-3 sticky top-0 z-50">
        <div className="container mx-auto flex items-center px-3 sm:px-6 lg:px-8">

          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden mr-2 sm:mr-3 text-gray-700 hover:text-gray-900 transition-colors duration-200"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <Link to="" className="shrink-0">
            <h1 className="text-base sm:text-xl font-bold text-gray-800">Fresh <span className="text-yellow-500">Cart</span></h1>
          </Link>

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

          <div className="flex items-center gap-2.5 sm:gap-5 ml-auto md:ml-0 shrink-0">
  
            <Link
              to="/cart"
              className="relative group"
              onClick={(e) => requireAuth(e, "cart")}
            >
              <i className="fa-solid fa-cart-shopping text-gray-700 group-hover:text-gray-700 text-sm sm:text-base transition-colors duration-200" />
              {token && cartInfo?.numOfCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-yellow-700 text-white text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center leading-none">
                  {cartInfo.numOfCartItems}
                </span>
              )}
            </Link>

            <Link
              to="/wishlist"
              className="relative group"
              onClick={(e) => requireAuth(e, "wishlist")}
            >
              <i className="fa-solid fa-heart text-gray-700 group-hover:text-rose-500 text-sm sm:text-base transition-colors duration-200" />
              {token && wishlistInfo?.count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-rose-500 text-white text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center leading-none">
                  {wishlistInfo.count}
                </span>
              )}
            </Link>

            <div className="w-px h-4 sm:h-5 bg-gray-700" />

            {token ? (
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-red-500 transition-colors duration-200"
              >
                <i className="fa-solid fa-right-from-bracket text-sm sm:text-base" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <ul className="flex items-center gap-1.5 sm:gap-3">
                <li>
                  <NavLink
                    to="/login"
                    className="text-[11px] sm:text-sm text-gray-700 hover:text-gray-800 transition-colors duration-200 whitespace-nowrap"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className="text-[11px] sm:text-sm bg-yellow-500 text-white px-2 sm:px-4 py-0.5 sm:py-1.5 rounded-full hover:bg-yellow-600 transition-colors duration-200 whitespace-nowrap"
                  >
                    Sign up
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      <div
        className={`fixed top-0 left-0 h-full w-72 max-w-[80%] bg-white z-50 md:hidden shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-800">Fresh <span className="text-yellow-500">Cart</span></h1>
          <button
            onClick={closeMenu}
            className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul className="flex flex-col p-2 mt-2">
          {navLinks.map(({ label, to, guarded }) => (
            <li key={label}>
              <NavLink
                className={mobileLinkClass}
                to={to}
                onClick={(e) => {
                  if (guarded) requireAuth(e, "orders");
                  closeMenu();
                }}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}