import { useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

export default function ForgetPassword() {

    const [isLoading , setIsLoading] = useState(false);
    const [errorMsg , setErrorMsg] = useState("");
    const [successMsg , setSuccessMsg] = useState("");
    let {setUserToken} = useContext(AuthContext);
    const navigation = useNavigate();

    let { handleSubmit , values , handleChange , errors ,touched ,handleBlur } = useFormik({
        initialValues: {
            "email":"",
        },
        onSubmit,
        validationSchema : Yup.object({
            email: Yup.string().required("Email is Required").email("Enter Vailed Email"),
        })
    })

    async function onSubmit() {
        setIsLoading(true);
        setErrorMsg("");
        setSuccessMsg("");
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values).then(({data}) => {
            setIsLoading(false);
            setSuccessMsg(data.message);
            setTimeout(() => {
                navigation("/Verify/" + email.value);
            }, 1000);
        }).catch((err) => {
            setErrorMsg(err.response.data.message);
            setIsLoading(false);
        })
     }

  return <>
    <div className="flex justify-center px-6 my-12 border shadow-md rounded-md">
				<div className="w-full xl:w-3/4 lg:w-11/12 flex">
					<div
						className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg" 
						 style={{"backgroundImage": "url('https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg')"}}
                        ></div>
					<div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
						<div className="px-8 mb-4 text-center">
							<h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
							<p className="mb-4 text-sm text-gray-700">
								We get it, stuff happens. Just enter your email address below and we'll send you a
								reset code your password!
							</p>
						</div>
						<form  onSubmit={ handleSubmit }   className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
									Email
								</label>
								<input onBlur={handleBlur} onChange={ handleChange } value={values.email}
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="email"
									type="email"
									placeholder="Enter Email Address..."
                                    name='email'
								/>
                                {touched.email && errors.email && <p className='text-red-500'>{errors.email}</p> }
							</div>
							<div className="mb-6 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={isLoading}
                                    type='submit'
								>
									Reset Password {isLoading && <i className='fa fa-spin fa-spinner'></i>}
								</button>
                                {errorMsg && <p className='text-red-500 text-center mt-3'> { errorMsg } </p>}
                                {successMsg && <p className='text-green-500 text-center mt-3'> { successMsg } </p>}
							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
								<Link to={"/register"} className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
									Create an Account!
								</Link>
							</div>
							<div className="text-center">
								<Link to={"/login"}
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									
								>
									Already have an account? Login!
								</Link>
							</div>
						</form>
					</div>
				</div>
	</div>
  
  </>
}
