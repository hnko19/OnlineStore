import axios from 'axios';
import React, { useState } from 'react';
import Product from '../Product/Product';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';
import LandingPage from '../LandingPage/LandingPage';
import { useQuery } from '@tanstack/react-query';
import BrandCart from '../BrandCart/BrandCart';
import Slider from 'react-slick';
import CatergoryCart from '../CatergoryCart/CatergoryCart';
import Products from '../Products/Products';
import MainTitle from '../MainTitle/MainTitle';

export default function Home() {
  // حالة البحث
  const [searchTerm, setSearchTerm] = useState('');

  // دالة لجلب المنتجات
  function getProduct() {
    return axios("https://ecommerce.routemisr.com/api/v1/products");
  }

  // دالة لجلب العلامات التجارية
  function getBrands() {
    return axios("https://ecommerce.routemisr.com/api/v1/brands");
  }

  // دالة لجلب الفئات
  function getCategories() {
    return axios("https://ecommerce.routemisr.com/api/v1/categories");
  }

  // جلب المنتجات
  let { data: productData, isLoading: isProductLoading } = useQuery({
    queryKey: ['product'],
    queryFn: getProduct
  });

  // جلب العلامات التجارية
  let { data: brandData, isLoading: isBrandLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands
  });

  // جلب الفئات
  let { data: categoriesData, isLoading: isCategoriesDataLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });



  

  // إذا كانت المنتجات أو العلامات التجارية أو الفئات قيد التحميل، عرض شاشة التحميل
  if (isProductLoading || isBrandLoading || isCategoriesDataLoading ) {
    return <LoadingScreen />;
  }




  // إعدادات السلايدر
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // للشاشات المتوسطة
        settings: {
          slidesToShow: 3, // عرض 3 شرائح
        }
      },
      {
        breakpoint: 768, // للشاشات الصغيرة
        settings: {
          slidesToShow: 2, // عرض شريحتين
        }
      }
    ]
  };

  // تصفية المنتجات بناءً على نص البحث
  const filteredProducts = productData?.data.data.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>FrechCart - Home</title>
      </Helmet>

      <LandingPage />

      {/* Brands Section */}
      <MainTitle title={"Our Brands"} />
      <div className='mb-10'>
        <Slider {...settings}>
          {
            brandData?.data.data.map((brand, index) => (
              <BrandCart key={index} brand={brand} />
            ))
          }
        </Slider>
      </div>

      {/* Categories Section */}
      <MainTitle title={"Our Categories"} />
      <div className='mb-10'>
        <Slider {...settings}>
          {
            categoriesData?.data.data.map((cat, index) => (
              <CatergoryCart key={index} cat={cat} />
            ))
          }
        </Slider>
      </div>

      {/* Products Section */}
      
      <Products />
    </>
  );
}
