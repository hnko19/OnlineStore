import React, { useState, useContext } from 'react';
import Product from '../Product/Product';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import MainTitle from '../MainTitle/MainTitle';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState(''); // حالة البحث
  const { userToken } = useContext(AuthContext);

  function getProduct() {
    return axios("https://ecommerce.routemisr.com/api/v1/products");
  }

  function getWishlist() {
    return axios("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        "token": userToken
      }
    });
  }

  const { data: productsData, isLoading: isProductsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProduct,
    refetchOnWindowFocus: true // إعادة جلب البيانات عند تركيز النافذة
  });

  const { data: wishlistData, isLoading: isWishlistLoading, refetch: refetchWishlist } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    refetchOnWindowFocus: true // إعادة جلب البيانات عند تركيز النافذة
  });

  // تصفية المنتجات بناءً على نص البحث
  const filteredProducts = productsData?.data.data.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>FreshCart - Products</title>
      </Helmet>
      {
        isProductsLoading || isWishlistLoading ? <LoadingScreen /> :
        <>
        <MainTitle title={"Our Products"} />
          <div className="flex items-center justify-center p-5">
            <div className="w-full rounded-lg bg-gray-200 p-5">
              <div className="flex">
                <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                  <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full bg-white pl-2 text-base font-semibold outline-0"
                  placeholder="Search Product"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // تحديث نص البحث
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {
              filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <Product 
                    key={index} 
                    product={product} 
                    isFavorite={wishlistData?.data.data.some(item => item._id === product._id)} 
                    refetchWishlist={refetchWishlist} // تمرير دالة إعادة الجلب
                  />
                ))
              ) : (
                <p className='col-span-full text-center text-gray-500'>No products found.</p>
              )
            }
          </div>
        </>
      }
    </>
  );
}
