import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import UserProvider from "./context/User.context";
import CartProvider from "./context/Cart.context";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import Cart from "./pages/Cart/Cart";
import CardDetails from "./pages/CardDetails/CardDetails";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Category from "./pages/Category/Category";
import Brands from "./pages/Brands/Brands";
import ForgetPassword from "./components/Auth-Password/ForgetPassword";
import ResetPassword from "./components/Auth-Password/ResetPassword";
import VerifyCode from "./components/Auth-Password/VerifyCode";
import WishlistProvider from "./context/Wishlist.context";
import WishList from "./pages/Wishlist/Wishlist";
import TokenProvider from "./context/Pass.context";
import Allproducts from "./pages/Allproducts/Allproducts";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <GuestRoute><Layout /></GuestRoute>,
      children: [
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "Auth-Password/forgetPassword", element: <ForgetPassword /> },
        { path: "Auth-Password/resetPassword", element: <ResetPassword /> },
        { path: "Auth-Password/verifyCode", element: <VerifyCode /> },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "product/:id", element: <CardDetails /> },
        { path: "checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
        { path: "categories", element: <Category /> },
        { path: "brands", element: <Brands /> },
        { path: "wishlist", element: <WishList/> },
        { path: "Products", element: <Allproducts/> },
      ],
    },
  ]);
  
  return (
    <>
      <TokenProvider>
        <UserProvider>
         
            <CartProvider> 
              <WishlistProvider> 
              <RouterProvider router={router} />
               </WishlistProvider>
            </CartProvider>
         
        </UserProvider>
      </TokenProvider>
      <Toaster />
    </>
  );
} 

export default App;
