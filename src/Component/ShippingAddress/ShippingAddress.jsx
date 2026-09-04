import { useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function ShippingAddress() {

    let {cartId} = useParams();
    const [isLoading , setIsLoading] = useState(false);
    const [errorMsg , setErrorMsg] = useState("");
    let {setUserToken} = useContext(AuthContext);
    const navigation = useNavigate();


    // const getBaseUrl = () => {
    //     return window.location.origin;
    // };
    
    let baseUrl = window.location.origin;

    let initialValues = {
        "shippingAddress": {
        "city":"",
        "phone":"",
        "details":""
        }
    }


    let { handleSubmit , values , handleChange , errors ,touched ,handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema : Yup.object({
            city: Yup.string().required("City is Required"),
            phone: Yup.string().required("Phone is Required"),
            details: Yup.string().required("Details is Required")
        })
    })

    function onSubmit() {
        setIsLoading(true);
        setErrorMsg("");
        axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+ cartId, values, {
            params: {
                "url" : baseUrl
            },
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({data})=>{
            setIsLoading(false);
            location.href = data.session.url
        }).catch(()=> {
            setIsLoading(false);
            setErrorMsg("Error Ocured");
        });
    }

    console.log(baseUrl)
  return  <>
 
 <div className='flex items-center justify-center min-h-screen'>
    <div className="w-full lg:w-1/3 md:w-1/2 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Add Checkout</h1>
        <form onSubmit={ handleSubmit } action="#" className="w-full flex flex-col gap-4">
        
        <div className="flex items-start flex-col justify-start">
            <label htmlFor="city" className="text-sm text-gray-700 dark:text-gray-200 mr-2">City:</label>
            <input onBlur={handleBlur} onChange={ handleChange } value={values.city} type="text" id="city" name="city" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-1 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.city && errors.city && <p className='text-red-500'>{errors.city}</p> }
        </div>

        <div className="flex items-start flex-col justify-start">
            <label htmlFor="details" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Details:</label>
            <input onBlur={handleBlur} onChange={ handleChange } value={values.details} type="text" id="details" name="details" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-1 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.details && errors.details && <p className='text-red-500'>{errors.details}</p> }
        </div>

        <div className="flex items-start flex-col justify-start">
            <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone:</label>
            <input onBlur={handleBlur} onChange={ handleChange } value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-1 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.phone && errors.phone && <p className='text-red-500'>{errors.phone}</p> }
        </div>
        

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isLoading} >Checkout  {isLoading && <i className='fa-spin fa fa-spinner ms-2'></i>} </button>
        {errorMsg && <p className='text-red-500 text-center'> { errorMsg } </p>}
        </form>

    </div>
 </div> 
  
  </>
  
}
