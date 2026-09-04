import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RatingStars from '../RatingStars/RatingStars';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ProductImagesSlider from '../ProductImagesSlider/ProductImagesSlider';
import RaledProducts from '../RelatedProducts/RelatedProducts';
import { AuthContext } from '../../Context/AuthContext';
import { addProductToCart } from '../../cartServices';

export default function ProductDetails() {
    let {id} = useParams();
    const [productDetails , setProductDetails] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    let {userToken} = useContext(AuthContext);

    useEffect(()=> {
        getProductDetail()
    },[id]);

    async function getProductDetail() {
        setIsLoading(true);
        let {data} = await axios("https://ecommerce.routemisr.com/api/v1/products/" + id);
        setProductDetails(data.data);
        getRelatedProducts(data?.data?.category._id); 
        setIsLoading(false);
    }

    async function getRelatedProducts(categoryId) {
        let { data } = await axios("https://ecommerce.routemisr.com/api/v1/products", {
            params: {
                "category" : categoryId
            }
        })
        setRelatedProducts(data.data);
    }

  return <>
    {   
        isLoading ? <LoadingScreen /> :
        <div className="bg-white">
            <main className="my-8">
                <div className="container mx-auto px-6">
                    <div className="md:flex md:items-center">
                        <div className="w-full  h-auto md:w-3/12">
                            {/* <img className="h-full rounded-md object-contain border mx-auto" src={productDetails?.imageCover} alt="Nike Air" /> */}
                            <ProductImagesSlider images={productDetails?.images} />
                        </div>
                        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-9/12">
                            <h3 className="text-gray-700 uppercase text-lg">{productDetails?.title}</h3>
                            <span className="text-gray-500 mt-3">${productDetails?.price}</span>
                            <hr className="my-3" />
                            {/* <div className="mt-2">
                                <label className="text-gray-700 text-sm" htmlFor="count">Count:</label>
                                <div className="flex items-center mt-1">
                                    <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </button>
                                    <span className="text-gray-700 text-lg mx-2">20</span>
                                    <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </button>
                                </div>
                            </div> */}
                            <div className="mt-3">
                                <label className="text-gray-700 text-sm" htmlFor="count">Rating:</label>
                                <RatingStars rating={productDetails?.ratingsAverage} />
                            </div>
                            <div className="mt-3">
                                <label className="text-gray-700 text-sm" htmlFor="count">Description:</label>
                                <h3>{productDetails?.description }</h3>
                            </div>
                            <div className="mt-3">
                                <label className="text-gray-700 text-sm" htmlFor="count">Category:</label>
                                <h3>{productDetails?.category?.name }</h3>
                            </div>
                            <div className="mt-3">
                                <label className="text-gray-700 text-sm" htmlFor="count">Sub Category:</label>
                                <h3>{productDetails?.subcategory?.[0]?.name }</h3>
                            </div>
                            <div className="mt-3">
                                <label className="text-gray-700 text-sm" htmlFor="count">Brand:</label>
                                <h3>{productDetails?.brand?.name }</h3>
                            </div>
                            <div className="flex items-center mt-6">
                                <button className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Order Now</button>
                                <button onClick={()=> addProductToCart(productDetails._id , userToken)} className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <RaledProducts relatedProducts={relatedProducts} />

                </div>
            </main>
        </div>
    }
  </>
}
