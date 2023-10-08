import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { Helmet } from 'react-helmet'

export default function NewPassword() {

    let { setUserToken } = useContext(UserContext);
    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function newPasswordSubmit(values) {

        setIsLoading(true)

        let response = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
            .catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            })

        if (response?.statusText === 'OK') {
            setIsLoading(false)
            localStorage.setItem('userToken', response.data.token)
            setUserToken(response.data.token)
            navigate('/')
        }

    }

    let validationSchema = Yup.object({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,11}$/, 'Password start with uppercase , minlength is 6 and maxlength is 12').required('Password is required')
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        }, validationSchema,
        onSubmit: newPasswordSubmit
    })

    return (
        <>
            <Helmet>
                <title>Reset Account</title>
            </Helmet>
            <div className="container">
                <form className='w-75 mx-auto py-4' onSubmit={formik.handleSubmit}>

                    {error ? <div className="alert alert-danger">{error}</div> : ''}
                    <h2 className='mb-4'>Reset Account</h2>

                    <label htmlFor="email">Email :</label>
                    <input type="email" className='form-control px-2 mb-3' placeholder='email' id='email' name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : ''}

                    <label htmlFor="newPassword">New Password :</label>
                    <input type="newPassword" className='form-control px-2 mb-3' placeholder='newPassword' id='newPassword' name='newPassword' value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.newPassword && formik.touched.newPassword ? <div className="alert alert-danger p-2 mt-2">{formik.errors.newPassword}</div> : ''}


                    {isLoading
                        ? <button type='button' className='btn btn-success d-block ms-auto '>
                            <i className='fas fa-spinner fa-spin px-3'></i>
                        </button>
                        :
                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success d-block ms-auto'>Reset Password</button>
                    }
                </form>
            </div>
        </>
    )
}
