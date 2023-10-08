import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {

  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function resgisterSubmit(values) {

    setIsLoading(true)

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setIsLoading(false)
        setError(err.response.data.message)
      });

    if (data.message === 'success') {
      setIsLoading(false)
      navigate('/login');
    }

  }

  const phoneRegExp = /^(002)?01[0-25][0-9]{8}$/;

  let validationSchema = Yup.object({
    name: Yup.string().min(3, 'Name minlength is 3').max(15, 'Name maxlength is 15').required('Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,11}$/, 'Password start with uppercase , minlength is 6 and maxlength is 12').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "password and rePassword does not match").required('rePassword is required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone is invalid').required('Phone is required')
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    }, validationSchema,
    onSubmit: resgisterSubmit
  })

  return (
    <>
      <Helmet>
        <title>Register Now</title>
      </Helmet>
      <div className="container">
        <form className='w-75 mx-auto py-4' onSubmit={formik.handleSubmit}>

          {error ? <div className="alert alert-danger">{error}</div> : ''}
          <h2 className='mb-4'>Register Now</h2>

          <label htmlFor="name">Name :</label>
          <input type="text" className='form-control px-2 mb-3' placeholder='name' id='name' name='name' value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.name && formik.touched.name ? <div className="alert alert-danger p-2 mt-2">{formik.errors.name}</div> : ''}

          <label htmlFor="email">Email :</label>
          <input type="email" className='form-control px-2 mb-3' placeholder='email' id='email' name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : ''}

          <label htmlFor="password">Password :</label>
          <input type="password" className='form-control px-2 mb-3' placeholder='password' id='password' name='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div> : ''}

          <label htmlFor="rePassword">RePassword  :</label>
          <input type="password" className='form-control px-2 mb-3' placeholder='rePassword' id='rePassword' name='rePassword' value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger p-2 mt-2">{formik.errors.rePassword}</div> : ''}

          <label htmlFor="phone">Phone :</label>
          <input type="tel" className='form-control px-2 mb-3' placeholder='phone' id='phone' name='phone' value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-2 mt-2">{formik.errors.phone}</div> : ''}

          {isLoading
            ? <button type='button' className='btn btn-success d-block ms-auto '>
              <i className='fas fa-spinner fa-spin px-3'></i>
            </button>
            : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success d-block ms-auto'>Submit</button>
          }

        </form>
      </div>
    </>
  )
}
