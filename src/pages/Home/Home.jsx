// Home.jsx
import React from "react";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import BrandSlider from "../../components/BrandSlider/BrandSlider";
import { Helmet } from "react-helmet";
import AllProducts from "../../components/AllProducts/AllProducts";
import AdsBanner from "../../components/AdsBanner/AdsBanner";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <HomeSlider />
      <BrandSlider />
      <AdsBanner/>
      <CategorySlider />
      <AllProducts/>
    </>
  );
}