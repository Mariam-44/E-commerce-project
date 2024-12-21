import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

    const {cartInfo} = useContext(CartContext)
    const {token} = useContext(UserContext)
    const navigate = useNavigate()
    const [PaymentMethod , setPaymentMethod] = useState(null)

    async function cashOrder(values) {
        let toastId = toast.loading("we are creating your order ...")
        try {
          const options = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
            method: "POST",
            headers: {
              token,
            },
            data: values
          };
          let { data } = await axios.request(options);
          if(data.status === "success"){
            toast.success("Your order has been completed")
            setTimeout(()=>{
                navigate("/allorders")
            },2000)
          }
          
        } catch (error) {
          console.log(error);
          
        }finally{
            toast.dismiss(toastId)
        }
      }
    async function onlineOrder(values) {
        try {
          const options = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
            method: "POST",
            headers: {
              token,
            },
            data: values
          };
          let { data } = await axios.request(options);
          console.log(data);
          
          if(data.status === "success"){
            toast.loading("redirecting you to stripe  ...")
            setTimeout(()=>{
                location.href = data.session.url
            },2000)
          }
          
        } catch (error) {
          console.log(error);
          
        }finally{
            toast.dismiss(toastId)
        }
      }
  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit : (values)=>{
        if(PaymentMethod === "cash")
            cashOrder(values)
        else{
            onlineOrder(values)
        }
    }
  });
  return (
    <>
      <h1 className="text-xl text-gray-600 font-semibold my-4">
        Shipping Address
      </h1>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div className="city">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
            name="shippingAddress.city"
          />
        </div>
        <div className="phone">
          <input
            type="tel"
            className="form-control"
            placeholder="Phone"
            value={formik.values.shippingAddress.phone}
            onChange={formik.handleChange}
            name="shippingAddress.phone"
          />
        </div>
        <div className="details">
          <textarea
            className="form-control"
            placeholder="Details"
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
            name="shippingAddress.details"
          ></textarea>
        </div>
        <button onClick={()=>{
            setPaymentMethod("cash")
        }} type="submit" className="rounded mr-3 text-sm py-1 px-3 bg-blue-500 hover:bg-blue-600 text-white">Cash Order</button>
        <button onClick={()=>{
            setPaymentMethod("Online")
        }} type="submit" className="rounded text-sm py-1 px-3 bg-lime-500 hover:bg-lime-600 text-white">Online Payment</button>
      </form>
    </>
  );
}
