import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';

export default function Address() {



    // let navigate = useNavigate();
    let { onlinePayment, cartId } = useContext(CartContext)
    const [isLoading, setIsLoading] = useState(false);
    const phoneRegExp = /^(002)?01[0-25][0-9]{8}$/;


    async function addressSubmit(values) {
        setIsLoading(true)

        let { data } = await onlinePayment(cartId, 'https://yousefnasra.github.io/FreshCart/#/', values)

        if (data?.status === 'success') {
            setIsLoading(false)
            window.location.href = data.session.url;
        } else {
            setIsLoading(false)
        }

    }

    let validationSchema = Yup.object({
        details: Yup.string().min(10, 'details minlength is 10').max(100, 'details maxlength is 100').required('details is required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone is invalid').required('Phone is required'),
        city: Yup.string().min(3, 'city minlength is 3').max(20, 'city maxlength is 100').required('city is required'),
    })

    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        }, validationSchema,
        onSubmit: addressSubmit
    })

    return (
        <>
            <Helmet>
                <title>User Address</title>
            </Helmet>
            <div className="container">
                <form className='w-75 mx-auto py-4' onSubmit={formik.handleSubmit}>

                    <h2 className='mb-4'>Address</h2>

                    <label htmlFor="details">Details :</label>
                    <input type="text" className='form-control px-2 mb-3' placeholder='Address Details' id='details' name='details' value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.details && formik.touched.details ? <div className="alert alert-danger p-2 mt-2">{formik.errors.details}</div> : ''}

                    <label htmlFor="phone">Phone :</label>
                    <input type="tel" className='form-control px-2 mb-3' placeholder='phone' id='phone' name='phone' value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-2 mt-2">{formik.errors.phone}</div> : ''}

                    <label htmlFor="city">City :</label>
                    <input type="text" className='form-control px-2 mb-3' placeholder='City' id='city' name='city' value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.city && formik.touched.city ? <div className="alert alert-danger p-2 mt-2">{formik.errors.city}</div> : ''}

                    {isLoading
                        ? <button type='button' className='btn btn-success d-block ms-auto '>
                            <i className='fas fa-spinner fa-spin px-3'></i>
                        </button>
                        : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success d-block mx-auto'>Pay Now</button>
                    }

                </form>
            </div>
        </>
    )
}
