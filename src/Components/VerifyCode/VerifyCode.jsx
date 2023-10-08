
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function VerifyCode() {

    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function verifyCodeSubmit(values) {

        setIsLoading(true)

        let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
            .catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            })

            if (response?.data.status === 'Success') {
            setIsLoading(false)
            navigate('/newpassword')
        }

    }

    const resetCodeRegExp = /^[0-9]{6}$/;

    let validationSchema = Yup.object({
        resetCode: Yup.string().matches(resetCodeRegExp, 'Reset code is invalid').required('Reset code is required')
    })

    const formik = useFormik({
        initialValues: {
            resetCode: "",
        }, validationSchema,
        onSubmit: verifyCodeSubmit
    })

    return (
        <>
            <Helmet>
                <title>Verify-Code</title>
            </Helmet>
            <div className="container">
                <form className='w-75 mx-auto py-4' onSubmit={formik.handleSubmit}>

                    <h2 className='mb-4'>Please enter your verification code </h2>

                    {error ? <div className="alert alert-danger my-2">{error}</div> : ''}

                    <label htmlFor="resetCode">Reset Code :</label>
                    <input type="resetCode" className='form-control px-2 mb-3' placeholder='Reset Code' id='resetCode' name='resetCode' value={formik.values.resetCode} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                    {formik.errors.resetCode && formik.touched.resetCode ? <div className="alert alert-danger p-2 mt-2">{formik.errors.resetCode}</div> : ''}

                    {isLoading
                        ? <button type='button' className='btn btn-success d-block ms-auto '>
                            <i className='fas fa-spinner fa-spin px-3'></i>
                        </button>
                        :
                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success d-block ms-auto'>Verify</button>
                    }
                </form>
            </div>
        </>
    )
}
