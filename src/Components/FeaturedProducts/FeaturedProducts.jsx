import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import Loading from '../Loading'
import { WishListContext } from '../../Context/WishListContext'


export default function FeaturedProducts() {

    let { addToCart, setCartItemsNum, getLoggedUserCart } = useContext(CartContext);
    let { addProductToWishlist, setIsWished, isWished } = useContext(WishListContext);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredProducts = data?.data.data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()));


    const filteredProductsMen = data?.data.data.filter((product) =>
        product.category["name"] === "Men's Fashion")



    const filteredProductsWomen = data?.data.data.filter((product) =>
        product.category["name"] === "Women's Fashion")



    const filteredProductsElectronics = data?.data.data.filter((product) =>
        product.category["name"] === "Electronics")

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
                    <div className="filter d-flex justify-content-between align-items-center mt-2 mb-3">
                        <input type='text' placeholder='Search' className='form-control w-100' onChange={(e) => setSearchTerm(e.target.value)} />
                        {/* Tap */}
                        <div className="nav nav-pills dropdown ps-3">
                            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Filter
                            </button>
                            <ul className="dropdown-menu" id="pills-tab" role="tablist">


                                <li className="nav-item ptr dropdown-item" role="presentation">
                                    <button className={`nav-link navlink active`} id="pills-All-tab" data-bs-toggle="pill" data-bs-target="#pills-All"
                                        type="button" role="tab" aria-controls="pills-All" aria-selected="true">All Products</button>
                                </li>


                                <li className="nav-item ptr dropdown-item" role="presentation">
                                    <button className={`nav-link navlink`} id="pills-men-tab" data-bs-toggle="pill" data-bs-target="#pills-men"
                                        type="button" role="tab" aria-controls="pills-men" aria-selected="false">Men's</button>
                                </li>




                                <li className="nav-item ptr dropdown-item" role="presentation">
                                    <button className={`nav-link navlink`} id="pills-women-tab" data-bs-toggle="pill" data-bs-target="#pills-women"
                                        type="button" role="tab" aria-controls="pills-women" aria-selected="false">Women's</button>
                                </li>





                                <li className="nav-item ptr dropdown-item" role="presentation">
                                    <button className={`nav-link  navlink`} id="pills-electronics-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-electronics" type="button" role="tab" aria-controls="pills-electronics"
                                        aria-selected="false">Electronics</button>
                                </li>



                            </ul>

                        </div>
                    </div>

                    <div className="tab-content  mb-5 d-flex justify-content-center " id="pills-tabContent">
                        {/* All Products */}
                        <div className="tab-pane fade show active" id="pills-All" role="tabpanel" aria-labelledby="pills-All-tab"
                            tabIndex="0">
                            <div className="container">
                                <div className="row">
                                    {!isLoading ? filteredProducts
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
                                        ) : <Loading></Loading>}
                                </div>
                            </div >
                        </div>

                        {/* Men */}
                        <div className="tab-pane fade" id="pills-men" role="tabpanel" aria-labelledby="pills-men-tab"
                            tabIndex="0">
                            <div className="container">
                                <div className="row">
                                    {!isLoading ? filteredProductsMen
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
                                        ) : <Loading></Loading>}
                                </div>
                            </div >
                        </div>

                        {/* Women */}
                        <div className="tab-pane fade" id="pills-women" role="tabpanel" aria-labelledby="pills-women-tab"
                            tabIndex="0">
                            <div className="container">
                                <div className="row">
                                    {!isLoading ? filteredProductsWomen
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
                                        ) : <Loading></Loading>}
                                </div>
                            </div >
                        </div>

                        {/* Elec */}
                        <div className="tab-pane fade" id="pills-electronics" role="tabpanel" aria-labelledby="pills-Graphic-tab"
                            tabIndex="0">
                            <div className="container">
                                <div className="row">
                                    {!isLoading ? filteredProductsElectronics
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
                                        ) : <Loading></Loading>}
                                </div>
                            </div >
                        </div>
                    </div>
                </div>
                {isLoading ? <Loading></Loading> : ''}
                {loading ? <Loading></Loading> : ''}
            </div>
        </>
    )
}
