import React, { useContext, useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";
import {WishlistContext} from "../../context/Wishlist.context"
export default function Navbar() {
  let { token, logout } = useContext(UserContext);
  const {cartInfo , getCartProduct} = useContext(CartContext)
const { wishlistInfo, getWishlistProducts } = useContext(WishlistContext); 

  useEffect(() => {
    getWishlistProducts();  
  }, []);

  useEffect(()=>{
    getCartProduct()
  },[])
  return (
    <nav className="bg-slate-100 shadow-sm py-3">
      <div className="container mx-auto flex items-center gap-12">
        <a href="">
          <img src={logo} alt="" />
        </a>
        {token && (
          <>
            {" "}
            <ul className="flex gap-5 items-center">
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`;
                  }}
                  to=""
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`;
                  }}
                  to="/Products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`;
                  }}
                  to="categories"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`;
                  }}
                  to="/brands"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`;
                  }}
                  to="/allorders"
                >
                  Orders
                </NavLink>
              </li>
            </ul>
            <Link to="/cart" className="cart-icon relative cursor-pointer ml-auto">
              <i class="fa-solid fa-cart-shopping text-lg"></i>
              <div className="counter flex justify-center items-center translate-x-1/2 -translate-y-1/2 absolute right-0 top-0 bg-primary-500 h-4 w-4 rounded-full">
                {cartInfo === null ? (<i className="fa-solid fa-spinner fa-spin text-white"></i>) : ( <span className="text-white text-sm">{cartInfo.numOfCartItems}</span>)}
               
              </div>
            </Link>
            <Link to="/wishlist" className="cursor-pointer relative">
                <i className="fa-solid fa-heart text-lg"></i>
                <div className="counter text-white flex justify-center items-center translate-x-1/2 -translate-y-1/2 absolute right-0 top-0 bg-primary-500 h-4 w-4 rounded-full">
                  {wishlistInfo === null ? (
                    <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                  ) : (
                    <span className="text-xs font-semibold">{wishlistInfo.count}</span>
                  )}
                </div>
              </Link>
          </> 
          
        )}

        <ul className={`flex gap-5 items-center ${!token && "ms-auto"}`}>
          <li>
            <a href="https://instagram.com" target="blank">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://facebook.com" target="blank">
              <i className="fa-brands fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="https://tiktok.com" target="blank">
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="blank">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" target="blank">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="https://youtube.com" target="blank">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </li>
        </ul>
        <ul className="flex gap-5 items-center">
  
  
          
          {!token && (
            <>
              {" "}
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`;
                  }}
                  to="/signup"
                >
                  Sign up
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                      isActive ? "before:!w-full font-semibold" : ""
                    }`;
                  }}
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
             
            </>
          )}
           {token && (
            <>
              {" "}
              <li onClick={logout}>
                <a>
                  <i class="fa-solid fa-right-from-bracket text-lg"></i>
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
