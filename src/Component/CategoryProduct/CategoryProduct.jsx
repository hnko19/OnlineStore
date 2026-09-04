import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Product from '../Product/Product'; // استيراد `Product` 
import { useParams } from 'react-router-dom';

export default function CategoryProduct() {
  let { catId } = useParams();
  const [categoryName, setCategoryName] = useState("");

  function getProduct() {
    return axios("https://ecommerce.routemisr.com/api/v1/products", {
      params: {
        category: catId
      }
    });
  }

  function getWishlist() {
    return axios("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        "token": localStorage.getItem('token')
      }
    });
  }

  let { data: productsData, isLoading: isProductsLoading, isError: isProductsError } = useQuery({
    queryKey: ['products', catId], // تحديث البيانات بناءً على `catId`
    queryFn: getProduct
  });

  const { data: wishlistData, isLoading: isWishlistLoading, refetch: refetchWishlist } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist
  });

  useEffect(() => {
    if (productsData) {
      setCategoryName(productsData?.data.data[0]?.category.name);
    }
  }, [productsData]);

  if (isProductsLoading || isWishlistLoading) return <LoadingScreen />;

  if (isProductsError) return <p>Error loading data.</p>;

  return (
    <>
      <h2 className='font-bold text-gray-500 text-3xl mb-6 mt-5'>
        Products Of {categoryName}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {
          productsData?.data.data.length > 0 ? (
            productsData?.data.data.map((productData, index) => (
              <Product 
                key={index} 
                product={productData} 
                isFavorite={wishlistData?.data.data.some(item => item._id === productData._id)} 
                refetchWishlist={refetchWishlist} // تمرير دالة إعادة الجلب
              />
            ))
          ) : (
            <div className="flex justify-center items-center col-span-full">
              <p className='text-center font-bold text-2xl text-yellow-500'>
                No products found in this category.
              </p>
            </div>
          )
        }
      </div>
    </>
  );
}
