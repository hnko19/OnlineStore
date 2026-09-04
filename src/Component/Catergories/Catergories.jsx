import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link, NavLink } from 'react-router-dom';
import CatergoryCart from '../CatergoryCart/CatergoryCart';
import { Helmet } from 'react-helmet';





export default function Catergories() {
  function getCatergories() {
    return axios("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let {data , isLoading} = useQuery({
    queryKey: ['categories'],
    queryFn: getCatergories
  })

  if(isLoading) {
    return <LoadingScreen />
  }
  
  return <>
  <Helmet>
    <title> FrechCart - Categories </title>
  </Helmet>
  <h2 className='font-bold text-gray-500 text-3xl mb-4 mt-5'>Our Categories </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {
          data?.data.data.map((cat , i)=> {
            return <CatergoryCart cat={cat} key={i}/>
            
            
          })
        }
      </div>
  </>
}
