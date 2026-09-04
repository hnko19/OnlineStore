import { useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Timer from '../Timer/Timer';

export default function ResetPassword() {
    let { email } = useParams();
    const [isLoading , setIsLoading] = useState(false);
    const [errorMsg , setErrorMsg] = useState("");
    const [successMsg , setSuccessMsg] = useState("");
    const navigation = useNavigate();

    let { handleSubmit , values , handleChange , errors ,touched ,handleBlur } = useFormik({
        initialValues: {
            "resetCode":"",
        },
        onSubmit,
        validationSchema : Yup.object({
            resetCode: Yup.string().required("Reset Code Required").matches(/^\d+$/ , "Must Be Numbers Only"),
        })
    })

    async function onSubmit() {
        setIsLoading(true);
        setErrorMsg("");
        setSuccessMsg("");
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values).then(({data}) => {
            setIsLoading(false);
            navigation("/resetpassword/"+ email)
            setSuccessMsg(data.message);
        }).catch((err) => {
            setErrorMsg(err.response.data.message);
            setIsLoading(false);
        })
     }   
  return <>
<div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md mx-auto mt-24">
    <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Confirm Code</h2>
        <p className="text-md md:text-xl">
            Enter the Code we just sent you in email.
        </p>
        {/* <Timer /> */}
    </div>
    <form onSubmit={ handleSubmit } action="">
        <div className="flex flex-col max-w-md space-y-5">
            <input onBlur={handleBlur} onChange={ handleChange } value={values.resetCode} type="text" id='resetCode' name='resetCode' placeholder="resetCode" className="flex px-3 py-2 md:px-4 md:py-3 text-center border rounded-md font-medium placeholder:font-normal" />
            {touched.resetCode && errors.resetCode && <p className='text-red-500 text-center'>{errors.resetCode}</p> }
            <button type='submit' className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium  border-black bg-black text-white disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={isLoading}>
                Confirm { isLoading && <i className='fa fa-spin fa-spinner'> </i> }
            </button>
            { errorMsg && <p className='text-red-500 mt-4 text-center'>{errorMsg} </p>}
        </div>
    </form>

</div>
        
  </>
}
