import { useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function Login() {

    const [isLoading , setIsLoading] = useState(false);
    const [errorMsg , setErrorMsg] = useState("");
    const [successMsg , setSuccessMsg] = useState("");
    let {setUserToken} = useContext(AuthContext);
    const navigation = useNavigate();

    let { handleSubmit , values , handleChange , errors ,touched ,handleBlur } = useFormik({
        initialValues: {
            "email":"",
            "password":""
        },
        onSubmit: login,
        validationSchema : Yup.object({
            email: Yup.string().required("Email is Required").email("Enter Vailed Email"),
            password: Yup.string().required("Password is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ , "Minimum eight characters, at least one letter and one number"),
        })
    })

    async function login() {
        setIsLoading(true);
        setErrorMsg("");
        setSuccessMsg("");
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then(({data}) => {
            setIsLoading(false);
            setSuccessMsg(data.message);
            setUserToken(data.token);
            localStorage.setItem("token", data.token);
            if(location.pathname == "/login") {
                navigation("/")
            }
            navigation(location.pathname);
            
        }).catch((err) => {
            console.log(err);
            setErrorMsg(err.response.data.message);
            setIsLoading(false);
        })
     }
  return  <>
 
 <div className='flex items-center justify-center min-h-screen'>
    <div className="w-full lg:w-1/3 md:w-1/2 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-4 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FrechCart</h1>
        <form onSubmit={ handleSubmit } action="#" className="w-full flex flex-col gap-4">
        
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

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isLoading} >Login  {isLoading && <i className='fa-spin fa fa-spinner ms-2'></i>} </button>
        {errorMsg && <p className='text-red-500 text-center'> { errorMsg } </p>}
        {successMsg && <p className='text-green-500 text-center'> { successMsg } </p>}
        </form>

        <div className="mt-4 text-center">
            <div>
                <span className="text-sm text-gray-500 dark:text-gray-300">Register new  account </span>
                <Link to={"/register"} className="text-blue-500 hover:text-blue-600">Register</Link>
            </div>
            <span>
                or
            </span>
            <div>
                <span className="text-sm text-gray-500 dark:text-gray-300"> Forget Your Password </span>
                <Link to={"/forgetpassword"} className="text-blue-500 hover:text-blue-600">Forget</Link>
            </div>
        </div>
    </div>
 </div> 
  
  </>
  
}
