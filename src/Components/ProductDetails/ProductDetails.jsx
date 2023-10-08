import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading'
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';

export default function ProductDetails() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        pauseOnHover: true
    };

    let { addProductToWishlist, setIsWished, isWished } = useContext(WishListContext);
    let { addToCart, setCartItemsNum } = useContext(CartContext);
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

    let { id } = useParams();
    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

    let { data, isLoading } = useQuery('productDetails', () => getProductDetails(id));

    return (
        <>
            {!isLoading
                ?
                <div className='container'>
                    <Helmet>
                        <meta name="description" content={data?.data.data.description} />
                        <title>{data?.data.data.title}</title>
                    </Helmet>
                    <div className="row py-2 align-items-center">
                        <div className="col-md-4 mb-3 mb-md-0">
                            <div className="product-img p-3">
                                <Slider {...settings}>
                                    {data?.data.data.images.map((img, index) => <img src={img} alt={data?.data.data.title} className='w-100' key={index} />)}
                                </Slider>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="product-details">
                                <h2 className='h4 mb-4 text-black fw-semibold'>{data?.data.data.title}</h2>
                                <p>{data?.data.data.description}</p>
                                <h6 className='text-main fw-semibold'>{data?.data.data.category.name}</h6>
                                <h6 className='text-main fw-semibold'>Price : {data?.data.data.price} EGP</h6>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>ratingsQuantity : {data?.data.data.ratingsQuantity}</span>
                                    <span>
                                        <i className='fa-solid fa-star rating-color me-1'></i>
                                        {data?.data.data.ratingsAverage}
                                    </span>
                                </div>
                                <div className='my-3 d-flex justify-content-between align-items-center'>
                                    <button onClick={() => addProductToCart(data?.data.data.id)} className='btn btn-success w-75'>Add to cart</button>
                                    {!isWished?.includes(data?.data.data._id)
                                        ? <i onClick={() => addToWishlist(data?.data.data._id)} className="fa-regular fa-heart text-main fa-xl cursor-pointer"></i>
                                        : <i onClick={() => addToWishlist(data?.data.data._id)} className="fa-solid fa-heart text-main fa-xl cursor-pointer"></i>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <Loading></Loading>
            }
            {loading ? <Loading></Loading> : ''}
        </>
    )
}
