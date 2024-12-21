import { createContext, useContext, useState} from "react";
import { UserContext } from "./User.context";
import axios from "axios";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartInfo, setcartInfo] = useState(null);

  
  async function addProduct({ productId }) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      getCartProduct()
      
    } catch (error) {
      console.log(error);
      
    }
  }

  async function getCartProduct() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
       
      };
      let { data } = await axios.request(options);
      console.log(data);
      
      setcartInfo(data)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  async function removeFromCart({productId}) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
       
      };
      let { data } = await axios.request(options);
      if(data.status === "success"){
        setcartInfo(data)
      }
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  async function clearCart() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
       
      };
      let { data } = await axios.request(options);
      console.log(data);
      
      if(data.message === "success"){
        setcartInfo({
          numOfCartItems : 0
        })
      }
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  async function updateProductCount({productId,count}) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data:{
          count
        }
       
      };
      let { data } = await axios.request(options);
      console.log(data);
      if(data.status === "success"){
        setcartInfo(data)
      }
      
      
    } catch (error) {
      console.log(error);
      
    }
    
  }


  return (
    <CartContext.Provider value={{ addProduct , getCartProduct , cartInfo , removeFromCart , clearCart , updateProductCount}}>
      {children}
    </CartContext.Provider>
  );
}
