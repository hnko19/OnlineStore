import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';
import LandingPage from '../LandingPage/LandingPage';
import { QueryClient, useQuery } from '@tanstack/react-query';

export default function Home() {
  
  
function getProduct() {
    return axios("https://ecommerce.routemisr.com/api/v1/products");
  }

  let {data , isLoading} = useQuery({
    queryKey: ['product'],
    queryFn: getProduct
  })
  
  
return <>
  <Helmet>
    <title>FrechCart - Home</title>
  </Helmet>
    {
      isLoading ? <LoadingScreen /> :
      <>
      <LandingPage />
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3'>
      {
        data?.data.data.map((product , index) => {
          return <Product key={index} product={product}/>
        }) 
      }
    </div>
    </>
    }
  </>
}
