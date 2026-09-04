import React, { useState } from 'react';
import RatingStars from '../RatingStars/RatingStars';
import { NavLink } from 'react-router-dom';
import { addProductToCart } from '../../cartServices';
import { addProductToWishList } from '../../Function/addProductToWishList';
import { removeProductFromWishlist } from '../../Function/removeProductFromWishlist';

export default function Product({ product, isFavorite, refetchWishlist }) {
  const [isInWishlist, setIsInWishlist] = useState(isFavorite);

  const handleWishlistClick = async (status) => {
    if(status == "add"){
      await addProductToWishList(product._id, localStorage.getItem('token'));
    }else{
      await removeProductFromWishlist(product._id, localStorage.getItem('token'))
    }
    refetchWishlist(); // إعادة جلب قائمة المفضلة
    setIsInWishlist(!isInWishlist); // تحديث حالة المفضلة
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      <div className="h-full bg-white shadow-lg border rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 transition hover:border-green-500 ">
        <NavLink to={"/productdetails/" + product._id}>
          <img className="rounded-t-lg p-8" src={product.imageCover} alt="product image" />
        </NavLink>
        <div className="px-5 pb-5">
          <NavLink to={"/productdetails/" + product._id}>
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">
              {product.title}
            </h3>
          </NavLink>
          <p className='line-clamp-2'> {product.description} </p>
          <RatingStars rating={product.ratingsAverage} />
          <div className='text-center my-3'>
            {
              isFavorite ? <i className='cursor-pointer fa-solid fa-heart text-green-500 fa-2x' onClick={()=> handleWishlistClick("remove")}></i>
              :
              <i className='cursor-pointer fa-regular fa-heart text-green-500 fa-2x' onClick={()=> handleWishlistClick("add")}></i>
            }
            
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white"> ${product.price}</span>
            <button
              onClick={() => addProductToCart(product._id, localStorage.getItem('token'))}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
