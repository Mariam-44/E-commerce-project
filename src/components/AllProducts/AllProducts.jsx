import React, { useEffect, useState, useContext } from "react";
import Card from "../../components/Card/Card";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";

function BestSellerCard({ productInfo }) {
  const { images, title, price, ratingsAverage, ratingsQuantity, id, description } = productInfo;
  const { addProduct } = useContext(CartContext);

  return (
    <div className="flex gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <Link to={`/product/${id}`} className="shrink-0">
        <img
          src={images[0]}
          alt={title}
          className="w-44 h-55  rounded-xl bg-gray-50"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-col justify-between flex-1 min-w-0 ">
        <div>
          <span className="inline-block bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
            Bestseller
          </span>
          <h2 className="text-sm font-bold text-gray-800 line-clamp-2 pt-2">{title}</h2>
          <p className="text-base font-bold text-gray-900 pt-3">${price}</p>

          {/* Stars */}
          <div className="flex items-center gap-1 my-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={`fa-solid fa-star text-xs ${
                  i < Math.round(ratingsAverage) ? "text-yellow-400" : "text-gray-200"
                }`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">({ratingsQuantity})</span>
          </div>

          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {description?.slice(0, 60)}...
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => addProduct({ productId: id })}
            className="bg-gray-900 text-white text-xs font-semibold px-5 py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-200"
          >
            Quick Add
          </button>
          <Link to={`/product/${id}`}>
            <i className="fa-solid fa-arrow-up-right-from-square text-gray-400 hover:text-gray-700 transition-colors duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AllProducts() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => setProducts(data.data));
  }, []);

  if (!products) return <Loading />;

  const newArrivals = products.slice(-6);
  const bestSellers = products.slice(-3);

  return (
  <>
    <Helmet>
      <title>All Products</title>
    </Helmet>

    <div className="px-4 sm:px-6 lg:px-8">

      <section className="mt-10 mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">New Arrivals</h2>
          <Link to="/Products" className="text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {newArrivals.map((product) => (
            <Card key={product._id} productInfo={product} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">Best Sellers</h2>
          <Link to="/Products" className="text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bestSellers.map((product) => (
            <BestSellerCard key={product._id} productInfo={product} />
          ))}
        </div>
      </section>
    </div>
  </>
);
}