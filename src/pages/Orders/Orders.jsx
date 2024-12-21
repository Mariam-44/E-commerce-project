import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { token } = useContext(UserContext);
  let { id } = jwtDecode(token);

  async function getUserOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    setOrders(data);
  }
  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <>
     <Helmet>
      <title>Orders Page</title>
    </Helmet>
      {orders ? (
        <section>
          {orders.map((order) => (
            <div
              key={order.id}
              className="order p-4 border-2 border-gray-500 border-opacity-25 rounded-lg mt-5"
            >
              <header className="flex justify-between items-center">
                <div>
                  <h2 className="text-gray-500 ">Order ID</h2>
                  <span className="text-lg font-semibold text-gray-700">
                    #121222110
                  </span>
                </div>
                <div>
                  {order.isPaid ? (
                    <span className="inline-block px-3 py-1 mr-2 bg-green-500 text-white font-semibold rounded-full">
                      تم الدفع
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 mr-2 bg-red-500 text-white font-semibold rounded-full">
                      غير مدفوع
                    </span>
                  )}
                  {order.isDelivered ? (
                    <span className="inline-block px-3 py-1 bg-green-500 text-white font-semibold rounded-full">
                      تم التوصيل
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-full">
                      قيد التوصيل
                    </span>
                  )}
                </div>
              </header>
              <div className="grid md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-3">
                {order.cartItems.map((product) => (
                  <div
                    key={product._id}
                    className="product-item border-2 border-gray-400 border-opacity-30 rounded-lg"
                  >
                    <div className="p-4">
                      <img
                        src={product.product.imageCover}
                        alt=""
                        className="w-full"
                      />
                      <h3 className="text-lg font-semibold line-clamp-1">
                        <Link to={`/product/${product.product.id}`}>
                          {product.product.title}
                        </Link>
                      </h3>
                      <div className="flex justify-between items-center mt-3">
                        <p>
                          <span className="font-bold ">count</span>{" "}
                          {product.count}
                        </p>
                        <span>{product.price} L.E</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-lg mt-4">Your Total Price <span className="mx-1 font-bold text-primary-400">{order.totalOrderPrice}</span> L.E</p>
            </div>
          ))}
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
