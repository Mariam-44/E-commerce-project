import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const WishlistContext = createContext(null);

export default function WishlistProvider({ children }) {
  const { token } = useContext(UserContext);
  const [wishlistInfo, setWishlistInfo] = useState(null);

  async function addProductToWishlist({ productId }) {
    const loadingID = toast.loading("Adding product to wishlist...");

    try {
      if (!token) {
        toast.error("You must be logged in to add a product to the wishlist.");
        return;
      }

      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };

      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success(data.message);
        getWishlistProducts();
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the product.");
    } finally {
      toast.dismiss(loadingID);
    }
  }

  async function getWishlistProducts() {
    try {
      if (!token) {
        toast.error("You must be logged in to view the wishlist.");
        return;
      }

      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);
      console.log("API Response: ", data);

      if (data.status === "success") {
        setWishlistInfo(data);
      } else {
        toast.error("Failed to load wishlist.");
      }
    } catch (error) {
      console.error("Error fetching wishlist: ", error);
      toast.error("An error occurred while fetching the wishlist.");
    }
  }

  async function removeProductFromWishlist({ productId }) {
    let toastId = toast.loading("Removing product from wishlist...");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success("Product has been removed from the wishlist");
        setWishlistInfo(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        getWishlistProducts,
        wishlistInfo,
        removeProductFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
