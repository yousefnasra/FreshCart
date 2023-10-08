import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { Helmet } from 'react-helmet'

export default function Login() {

  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function loginSubmit(values) {

    setIsLoading(true)

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setIsLoading(false)
        setError(err.response.data.message)
      })

    if (data.message === 'success') {
      setIsLoading(false)
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate('/')
    }

  }

  let validationSchema = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,11}$/, 'Password start with uppercase , minlength is 6 and maxlength is 12').required('Password is required')
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    }, validationSchema,
    onSubmit: loginSubmit
  })

  return (
    <>
      <Helmet>
        <title>Login Now</title>
      </Helmet>
      <div className="container">
        <form className='w-75 mx-auto py-4' onSubmit={formik.handleSubmit}>

          {error ? <div className="alert alert-danger">{error}</div> : ''}
          <h2 className='mb-4'>Login Now</h2>

          <label htmlFor="email">Email :</label>
          <input type="email" className='form-control px-2 mb-3' placeholder='email' id='email' name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : ''}

          <label htmlFor="password">Password :</label>
          <input type="password" className='form-control px-2 mb-3' placeholder='password' id='password' name='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div> : ''}

          <Link to='/resetpassword' className="text-main mb-3">Forgot password?</Link>

          {isLoading
            ? <button type='button' className='btn btn-success d-block ms-auto mt-3'>
              <i className='fas fa-spinner fa-spin px-3'></i>
            </button>
            : <div className="d-flex align-items-center mt-3">
              <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success d-block ms-auto'>Submit</button>
              <Link to='/register' className='btn ms-3'>Register Now</Link>
            </div>
          }
        </form>
      </div>
    </>
  )
}
