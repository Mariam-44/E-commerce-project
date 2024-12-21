import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import BrandCard from '../../components/BrandCard/BrandCard';
import BrandDetails from '../../components/BrandDetails/BrandDetails';
import { Helmet } from 'react-helmet';

export default function Brands() {
  const [brands, setBrands] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null); 

  async function getBrands() {
    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/brands',
        method: 'GET',
      };
      const { data } = await axios.request(options);
      console.log(data.data);
      setBrands(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand); 
  };

  const closeModal = () => {
    setSelectedBrand(null); 
  };

  return (
    <>
     <Helmet>
      <title>Brands Page</title>
    </Helmet>
      <h1 className="text-4xl font-bold text-center mt-10 text-primary-500">
        All Brands
      </h1>
      <div className="grid grid-cols-12 gap-4 py-10 container">
        {loading ? (
          <Loading />
        ) : brands ? (
          brands.map((brand) => (
            <BrandCard
              key={brand._id}
              brandInfo={brand}
              onClick={() => handleBrandClick(brand)} 
            />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-12">
            No brands available at the moment.
          </p>
        )}
      </div>

  
      {selectedBrand && (
        <BrandDetails
          brand={selectedBrand}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
