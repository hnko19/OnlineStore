import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Products from '../Product/Product';
import { useParams } from 'react-router-dom';

export default function CategoryProduct() {
  let {catId}  =  useParams();
  const [productList, setProductList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
//  const categoryIdToFilter = "6439d5b90049ad0b52b90048"; // ID الفئة المطلوب تصفيتها



  function getProduct() {
    return axios("https://ecommerce.routemisr.com/api/v1/products");
  }



  let { data, isLoading, isError } = useQuery({
    queryKey: ['product'],
    queryFn: getProduct
  });

  useEffect(() => {
    if (data) {
      // تصفية المنتجات حسب ID الفئة
      const filteredProducts = data.data.data.filter(product => product.category._id === catId);
      setCategoryName(filteredProducts[0].category.name);
      setProductList(filteredProducts);
    }
  }, [data]);



  if (isLoading) return <LoadingScreen />;

  if (isError) return <p>Error loading data.</p>;

  return (
    <>
    <h2 className='font-bold text-gray-500 text-3xl mb-4 mt-5'> Products Of {categoryName}  </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {
          productList.length > 0 ? (
            productList.map((productData, index) => (
              <Products key={index} product={productData} />
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