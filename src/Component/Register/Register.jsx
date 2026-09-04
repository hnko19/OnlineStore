import { useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {

    const[isLoading , SetIsLoading] = useState(false);
    const[errorMsg, setErrorMsg] = useState("");
    const[successMsg, setSuccessMsg] = useState("");
    const navigation = useNavigate();

    let { handleSubmit , values , handleChange , errors ,touched ,handleBlur } = useFormik({
        initialValues: {
            "name": "",
            "email":"",
            "password":"",
            "rePassword":"",
            "phone":""
        },
        onSubmit: register,
        validationSchema : Yup.object({
            name: Yup.string().required("Name is Required").min(3 , "Name must be at lest 3 character"),
            email: Yup.string().required("Email is Required").email("Enter Vailed Email"),
            password: Yup.string().required("Password is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ , "Minimum eight characters, at least one letter and one number"),
            rePassword: Yup.string().required("Re-Password is Required").oneOf([Yup.ref("password")] , "Re-password Must Matched Password"),
            phone: Yup.string().required("Phone is Required")
        })
    })

    async function register() {
        setErrorMsg("");
        setSuccessMsg("");
        SetIsLoading(true);
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then(({data}) => {
            SetIsLoading(false);
            setSuccessMsg(data.message);
            setTimeout(() => {
                navigation("/login")
            }, 500);
        }).catch((err)=> {
            SetIsLoading(false);
            setErrorMsg(err.response.data.message);
        });
     }
  return  <>
 
 <div className='flex items-center justify-center min-h-screen'>
    <div className="w-full lg:w-1/3 md:w-1/2 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FrechCart</h1>
        <form onSubmit={ handleSubmit } action="#" className="w-full flex flex-col gap-4">
        <div className="flex items-start flex-col justify-start">
            <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Name:</label>
            <input onBlur={ handleBlur }  onChange={ handleChange } value={values.name} type="text" id="name" name="name" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-1 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.name && errors.name && <p className='text-red-500'>{errors.name}</p> }
        </div>

        <div className="flex items-start flex-col justify-start">
            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
            <input onBlur={handleBlur} onChange={ handleChange } value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-1 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.email && errors.email && <p className='text-red-500'>{errors.email}</p> }
        </div>

        <div className="flex items-start flex-col justify-start">
            <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
            <input onBlur={handleBlur} onChange={ handleChange } value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-1 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" autoComplete='off'/>
            {touched.password && errors.password && <p className='text-red-500'>{errors.password}</p> }
        </div>

        <div className="flex items-start flex-col justify-start">
            <label htmlFor="rePassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
            <input onBlur={handleBlur} onChange={ handleChange } value={values.rePassword} type="password" id="rePassword" name="rePassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-1 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" autoComplete='off'/>
            {touched.rePassword &&  errors.rePassword && <p className='text-red-500'>{errors.rePassword}</p> }
        </div>

        <div className="flex items-start flex-col justify-start">
            <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone Number:</label>
            <input onBlur={handleBlur} onChange={ handleChange } value={values.phone} type="text" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-1 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.phone &&  errors.phone && <p className='text-red-500'>{errors.phone}</p> }
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isLoading}>Register {isLoading && <i className='ms-1 fa-spinner fa fa-spin'></i>} </button>
        {errorMsg && <p className='text-red-500 text-center'>{ errorMsg }</p>}
        {successMsg && <p className='text-green-500 text-center'>{ successMsg }</p>}
        </form>

        <div className="mt-4 text-center">
        <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
        <Link to={"/login"} className="text-blue-500 hover:text-blue-600">Login</Link>
        </div>
    </div>
 </div> 
  
  </>
  
}
