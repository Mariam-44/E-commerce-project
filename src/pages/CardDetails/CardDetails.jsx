import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import { WishlistContext } from "../../context/Wishlist.context";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../components/Card/Card";
import { Helmet } from "react-helmet";

export default function CardDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("reviews");

  const { id } = useParams();
  const { addProduct } = useContext(CartContext);
  const { addProductToWishlist } = useContext(WishlistContext);

  async function getDetails() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
      setSelectedImage(0);
    } catch (error) {
      console.log(error);
    }
  }

  async function getRelatedProducts(categoryId) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
      );
      setRelatedProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getReviews() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`
      );
      setReviews(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDetails();
    getReviews();
  }, [id]);

  useEffect(() => {
    if (!productDetails) return;
    getRelatedProducts(productDetails.category._id);
  }, [productDetails]);

  if (!productDetails) return <Loading />;

  const { title, images, price, description, ratingsAverage, ratingsQuantity, brand, category } = productDetails;

  // Rating breakdown (mock distribution based on average)
  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews
      ? reviews.filter((r) => Math.round(r.rating) === star).length
      : 0,
  }));

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mt-5 mb-6 flex gap-1">
        <span>Home</span>
        <span>/</span>
        <span>{category.name}</span>
        <span>/</span>
        <span className="text-gray-700">{brand?.name}</span>
      </nav>

      {/* Main product section */}
      <section className="grid grid-cols-12 gap-10 mb-12">

        {/* Left — image gallery */}
        <div className="col-span-12 md:col-span-5">
          {/* Main image */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden mb-3 flex items-center justify-center h-80">
            <img
              src={images[selectedImage]}
              alt={title}
              className="h-full w-full object-contain p-4"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === i
                    ? "border-gray-900"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-contain bg-gray-50 p-1" />
              </button>
            ))}
            {images.length > 4 && (
              <div className="w-16 h-16 rounded-xl border-2 border-gray-200 flex items-center justify-center text-xs text-gray-400 font-medium">
                +{images.length - 4} more
              </div>
            )}
          </div>
        </div>

        {/* Right — product details */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-4">

          {/* Brand + SKU */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-500">{brand?.name}</span>
            </div>
            <span className="text-xs text-gray-400">#{id.slice(-8).toUpperCase()}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">{title}</h1>

          {/* Stars */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={`fa-solid fa-star text-sm ${
                  i < Math.round(ratingsAverage) ? "text-yellow-400" : "text-gray-200"
                }`}
              />
            ))}
            <span className="text-sm text-gray-400">{ratingsQuantity} reviews</span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-gray-900">${price}.00</p>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => addProduct({ productId: id })}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-yellow-700/80 transition-colors duration-200"
            >
              <i className="fa-solid fa-cart-shopping text-sm" />
              Add to Cart
            </button>
            <button
              onClick={() => addProductToWishlist({ productId: id })}
              className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-red-400 hover:text-red-400 transition-colors duration-200"
            >
              <i className="fa-solid fa-heart" />
            </button>
          </div>

          {/* Free delivery note */}
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <i className="fa-solid fa-truck" />
            Free delivery on orders over $30.0
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="mb-10">
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          {["details", "reviews", "discussion"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold capitalize transition-colors duration-200 border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Details tab */}
        {activeTab === "details" && (
          <div className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
            {description}
          </div>
        )}

        {/* Reviews tab */}
        {activeTab === "reviews" && (
          <div className="grid grid-cols-12 gap-8">

            {/* Left — review list */}
            <div className="col-span-12 md:col-span-7 flex flex-col gap-5">
              {reviews === null ? (
                <Loading />
              ) : reviews.length === 0 ? (
                <p className="text-sm text-gray-400">No reviews yet.</p>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="flex gap-3">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 font-bold text-sm shrink-0">
                      {review.user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-800">
                          {review.user?.name || "Anonymous"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      {/* Stars */}
                      <div className="flex gap-0.5 my-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <i
                            key={i}
                            className={`fa-solid fa-star text-xs ${
                              i < review.rating ? "text-yellow-400" : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{review.review}</p>
                      {/* Reply / Like */}
                      <div className="flex gap-4 mt-2 text-xs text-gray-400">
                        <button className="hover:text-gray-600">Reply</button>
                        <button className="flex items-center gap-1 hover:text-gray-600">
                          <i className="fa-regular fa-thumbs-up" /> 0
                        </button>
                        <button className="flex items-center gap-1 hover:text-gray-600">
                          <i className="fa-regular fa-thumbs-down" /> 0
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Right — rating summary */}
            <div className="col-span-12 md:col-span-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={`fa-solid fa-star text-xl ${
                        i < Math.round(ratingsAverage) ? "text-yellow-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-3xl font-bold text-gray-900">{ratingsAverage}</span>
              </div>

              {/* Breakdown bars */}
              <div className="flex flex-col gap-2">
                {ratingBreakdown.map(({ star, count }) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-3">{star}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                        style={{
                          width: reviews?.length
                            ? `${(count / reviews.length) * 100}%`
                            : "0%",
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-4">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Discussion tab */}
        {activeTab === "discussion" && (
          <p className="text-sm text-gray-400">No discussions yet.</p>
        )}
      </section>

      {/* Related Products */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Related Products</h2>
        {relatedProducts ? (
          <Swiper slidesPerView={5} spaceBetween={16}>
            {relatedProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <Card productInfo={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
}