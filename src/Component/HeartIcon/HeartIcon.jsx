import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { addProductToWishList } from '../../Function/addProductToWishList';


export default function HeartIcon({productId}) {
    const[wishlist , setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    let {userToken} = useContext(AuthContext);
    let isInWishlist = false;


    useEffect(()=>{
      getWishlist();
      checkIfProductInWishList(productId)
  },[wishlist])

    async function getWishlist() {
        axios("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({data})=> {
            console.log(data)
            setIsLoading(false)
            setWishlist(data.data._id);
        })
    }
    function checkIfProductInWishList(productId) {
        if(wishlist?.includes(productId)){
            isInWishlist = true;
        } 
    }
  return <>
    {
        isInWishlist ? <i className='cursor-pointer fa-solid fa-heart text-green-500 fa-2x' onClick={()=> addProductToWishList(productId , userToken)}></i>
        :
        <i className='cursor-pointer fa-regular fa-heart text-green-500 fa-2x' onClick={()=> addProductToWishList(productId , userToken)}></i>
    }
  </>
 
    
    
}
