import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick'
import { AuthContext } from '../../Context/AuthContext';
import { addProductToCart } from '../../cartServices';

export default function RaledProducts({relatedProducts}) {
    let {userToken} = useContext(AuthContext);
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024, // حجم الشاشة الكبير
                settings: {
                    slidesToShow: 5, // عدد الصور في الشاشة الكبيرة
                },
            },
            {
                breakpoint: 768, // حجم الشاشة المتوسطة
                settings: {
                    slidesToShow: 3, // عدد الصور في الشاشة المتوسطة
                },
            },
            {
                breakpoint: 480, // حجم الشاشة الصغيرة
                settings: {
                    slidesToShow: 1, // عدد الصور في الشاشة الصغيرة
                },
            },
        ],
      };


  return <>
                    <div className="mt-16">
                        <h3 className="text-gray-600 text-2xl mb-4 font-medium">More Products</h3>
                        <Slider {...settings}>
                            {
                                relatedProducts.map((ralteProduct , index)=> {
                                    return <div key={index} className="w-full max-w-sm mx-auto my-4 p-2 overflow-hidden">
                                                <div className='shadow-md rounded-md'>
                                                    <div className="flex items-end justify-end h-56 w-full bg-cover" style={{"backgroundSize": "contain", "backgroundRepeat": "no-repeat", "backgroundPosition": "center" ,"backgroundImage": `url(${ralteProduct.imageCover})`}}>
                                                        <button onClick={()=> addProductToCart(ralteProduct._id,userToken)}  className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                                        </button>
                                                    </div>
                                                    <div className="px-5 py-3">
                                                        <Link to={"/productdetails/" + ralteProduct._id}><h3 className="text-gray-700 uppercase">{ralteProduct.title}</h3></Link>
                                                        <span className="text-gray-500 mt-2">${ralteProduct.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                })
                            }
                        </Slider>
                    </div>
  
  </>
}
