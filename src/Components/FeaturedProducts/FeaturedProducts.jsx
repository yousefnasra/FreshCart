import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import Loading from '../Loading'
import { WishListContext } from '../../Context/WishListContext'


export default function FeaturedProducts() {

    let { addToCart, setCartItemsNum , getLoggedUserCart} = useContext(CartContext);
    let { addProductToWishlist, setIsWished, isWished } = useContext(WishListContext);
    const [loading, setLoading] = useState(false)

    async function addToWishlist(productId) {
        setLoading(true)
        let response = await addProductToWishlist(productId);
        setIsWished(response?.data?.data);
        setLoading(false)
        if (response?.data.status === 'success') {
            toast.success(response.data.message,
                { className: 'text-center font-sm' });
        } else {
            toast.error(response.data.message,
                { className: 'text-center font-sm' });
        }
    }

    async function addProductToCart(productId) {
        setLoading(true)
        let response = await addToCart(productId);
        setLoading(false)
        if (response.data.status === 'success') {
            toast.success(response.data.message,
                { className: 'text-center font-sm' });
        } else {
            toast.error(response.data.message,
                { className: 'text-center font-sm' });
        }
        setCartItemsNum(response.data.numOfCartItems)
    }

    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }

    let { data, isLoading } = useQuery('featuredProducts', getProducts)

    async function getCart() {
        let { data } = await getLoggedUserCart();
        if (data?.status === 'success') {
            setCartItemsNum(data.numOfCartItems)
        }
    }

    let headers = {
        token: localStorage.getItem('userToken')
    }

    async function getLoggedWishlist() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        })
        setIsWished(data?.data?.map((item) => item.id));
    }

    useEffect(() => {
        getLoggedWishlist()
        getCart()
    }, [])

    return (
        <>
            <div className='container'>
                <div className="row">

                    <h2 className='my-4'>featured Products</h2>
                    {isLoading ? <Loading></Loading> : data?.data.data
                        .map((product) => <div className="col-lg-2 col-md-4" key={product._id}>
                            <div className="product cursor-pointer p-3">
                                <Link to={`/productdetails/${product._id}`}>
                                    <img src={product.imageCover} alt={product.title.split(' ').slice(0, 2).join(' ')} className='w-100' />
                                    <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
                                    <h3 className='h6'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span>{product.price} EGP</span>
                                        <span> <i className='fa-solid fa-star rating-color'></i> {product.ratingsAverage}</span>
                                    </div>
                                </Link>
                                <div className="d-flex justify-content-between align-items-center my-2">
                                    <button onClick={() => addProductToCart(product._id)} className='btn btn-success'>Add to cart</button>
                                    {!isWished?.includes(product._id)
                                        ? <i onClick={() => addToWishlist(product._id)} className="fa-regular fa-heart text-main fa-xl"></i>
                                        : <i onClick={() => addToWishlist(product._id)} className="fa-solid fa-heart text-main fa-xl"></i>}
                                </div>
                            </div>
                        </div>
                        )}
                </div>
            </div >
            {loading ? <Loading></Loading> : ''}
        </>
    )
}
