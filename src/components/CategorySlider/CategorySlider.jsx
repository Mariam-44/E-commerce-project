// CategoryGrid.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";


export default function CategoryGridV1() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => setCategories(data.data));
  }, []);

  return (
    <>
     

      {/* Category Grid — all tiles visible */}
      {categories ? (
        <section className="my-6  rounded-md ">
          <h2 className="text-lg font-bold text-gray-800">
            Popular Categories
          </h2>

          <div className="grid grid-cols-5 gap-2 mt-10">
            {categories.map((category) => (
              <Link
                to="/categories"
                key={category._id}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-60 h-60 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 group-hover:border-yellow-600/30 group-hover:shadow-md transition-all duration-200">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs text-center text-gray-500 group-hover:text-yellow-500 font-medium leading-tight transition-colors duration-200">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
