import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loading from '../Loading';

export default function Orders() {

    const decoded = jwt_decode(localStorage.getItem('userToken'));
    const userId = decoded.id;

    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(false)


    async function getUserOrders(userId) {
        setLoading(true)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
        setOrders(data)
        setLoading(false)
    }


    useEffect(() => { getUserOrders(userId) }, [])

    return (
        <>
            <Helmet>
                <title>Orders</title>
            </Helmet>
            <div className='container bg-main-light p-3'>
                <h3 className='mb-4 py-2'>Orders Status </h3>
                {orders
                    ?
                    <div className="row p-3">
                        {orders.map((order, index) =>
                            <div className="col-12 border-bottom p-2" key={order.id}>
                                <h4 className='fw-bolder my-2'>order {index + 1}</h4>
                                <ul className='list-unstyled'>
                                    <li>
                                        <h6 className='fw-bolder'>Order_ID : <span className='text-muted'>{order.id}</span></h6>
                                    </li>
                                    <li>
                                        <h6 className='fw-bolder'>Address : <span className='text-muted'>{order.shippingAddress.city}</span></h6>
                                    </li>
                                    <li>
                                        <h6 className='fw-bolder'>Details : <span className='text-muted'>{order.shippingAddress.details}</span></h6>
                                    </li>
                                    <li>
                                        <h6 className='fw-bolder'>Phone : <span className='text-muted'>{order.shippingAddress.phone}</span></h6>
                                    </li>
                                    <li>
                                        <h6 className='fw-bolder'>Payment type : <span className='text-main'>{order.paymentMethodType}</span></h6>
                                    </li>
                                    <li>
                                        <h6 className='fw-bolder'>Total Order Price : <span className='text-main'>{order.totalOrderPrice} EGP</span></h6>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    : <h4>There are no orders yet.</h4>
                }
            </div>
            {loading ? <Loading></Loading> : ''}
        </>
    )
}
