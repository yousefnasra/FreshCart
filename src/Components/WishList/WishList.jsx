import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import Loading from '../Loading';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext';

export default function WishList() {

    let headers = {
        token: localStorage.getItem('userToken')
    }
    let { addToCart, setCartItemsNum } = useContext(CartContext);
    let { removeProductFromWishlist, setIsWished } = useContext(WishListContext);
    const [loading, setLoading] = useState(false)

    function getLoggedWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        })
    }

    let { data, isLoading, refetch } = useQuery('wishList', getLoggedWishlist)
    
    async function removeFromWishlist(productId) {
        setLoading(true)
        let response = await removeProductFromWishlist(productId);
        setIsWished(response?.data?.data);
        if (response.data.status === 'success') {
            refetch();
        } else {
            toast.error(response.data.message,
                { className: 'text-center font-sm' });
        }
        setLoading(false)
    }

    async function addProductToCart(productId) {
        setLoading(true)
        let response = await addToCart(productId);
        if (response.data.status === 'success') {
            removeFromWishlist(productId);
        } else {
            toast.error(response.data.message,
                { className: 'text-center font-sm' });
        }
        setCartItemsNum(response.data.numOfCartItems)
        setLoading(false);
    }

    return (
        <>
            <Helmet>
                <title>Wish List</title>
            </Helmet>
            <div className="w-75 mx-auto bg-main-light p-3">
                <h3 className='my-4 py-2'>My Wish List </h3>
                {isLoading
                    ? <Loading></Loading>
                    : data?.data.data.map((wish, index) =>
                        <div className='row border-bottom p-2' key={index}>
                            <div className="col-md-2 ">
                                <img src={wish.imageCover} alt={wish.title} className='w-100' />
                            </div>

                            <div className="col-md-10 my-2 my-md-0">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h3 className='h6 fw-semibold'>{wish.title.split(' ').slice(0, 3).join(' ')}</h3>
                                        <h6 className='mb-3 fw-semibold'>Price : <span className='fw-bolder text-main'>{wish.price} EGP</span></h6>
                                        <button onClick={() => removeFromWishlist(wish._id)} className='btn border-0  p-0'><i className='fas fa-trash-can text-danger'></i> Remove </button>
                                    </div>
                                    <div>
                                        <button onClick={() => addProductToCart(wish._id)} className='btn btn-success btn-sm fw-bolder'>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {loading ? <Loading></Loading> : ''}
        </>
    )
}
