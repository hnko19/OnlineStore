import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import { NavLink } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import BrandCart from '../BrandCart/BrandCart';
import { Helmet } from 'react-helmet';

export default function Brands() {
  
  function getBrands() {
    return axios("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let {data , isLoading} = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands
  })
  
  if(isLoading) {
    return <LoadingScreen />
  }
  return <>
    <Helmet>
      <title> FrechCart - Brands </title>
    </Helmet>
      <h2 className='font-bold text-gray-500 text-3xl mb-4 mt-5'>Our Brand </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {
        data?.data.data.map((brand , index)=> {
          return <BrandCart  brand={brand} key={index}/>
        })
        }
        </div>
      
  </>
}
