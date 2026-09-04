import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { addProductToCart } from '../../cartServices';
import { Bounce, toast } from 'react-toastify';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { removeProductFromWishlist } from '../../Function/removeProductFromWishlist';
import MainTitle from '../MainTitle/MainTitle';

export default function WishList() {
    let {userToken} = useContext(AuthContext);



  function getWishlist() {
      return axios("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
    }


    const { data, isLoading } = useQuery({
      queryKey: ['wishlist'],
      queryFn: getWishlist,
    });

  
  

    
  return <>
    {
      isLoading ? <LoadingScreen /> 
      :
      <>
      <MainTitle title={"My Wishlist"} />
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-400 border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Image
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Product
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Amount
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Action
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                      data?.data.data.map((product , index)=>{
                          return <tr key={index} className="bg-white border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <img src={product.imageCover} className='w-10' />
                          </td>
                          <td className="text-sm font-semibold text-gray-700 px-6 py-4 whitespace-nowrap">
                            {product.title}
                          </td>
                          <td className="text-sm font-semibold text-gray-700  px-6 py-4 whitespace-nowrap">
                            ${product.price}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6  py-4 whitespace-nowrap">
                            <button onClick={()=>addProductToCart(product._id , userToken)} className='px-3 py-1 bg-green-600 text-white transition hover:bg-green-500'>Add to Cart</button>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6  py-4 whitespace-nowrap">
                            <i onClick={()=> removeProductFromWishlist(product.id , userToken)} className="fa-regular fa-trash-can cursor-pointer"></i>
                          </td>
                      </tr>
                      })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </>

    }
  
  </>
   

}
