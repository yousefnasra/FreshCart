import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Loading from '../Loading'


export default function Cart() {
  let { getLoggedUserCart, removeCartItem, updateProductQuantity, setCartItemsNum } = useContext(CartContext);
  const [dataDetails, setDataDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    setDataDetails(data)
    setCartItemsNum(data.numOfCartItems)
  }

  async function getCart() {
    setIsLoading(true)
    let { data } = await getLoggedUserCart();
    if (data?.status === 'success') {
      setDataDetails(data)
      setCartItemsNum(data.numOfCartItems)
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  async function updateCount(id, count) {
    if (count === 0) {
      removeItem(id);
    } else {
      let { data } = await updateProductQuantity(id, count);
      setDataDetails(data)
      setCartItemsNum(data.numOfCartItems)
    }
  }
  useEffect(() => { getCart() }, [])

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="w-75 mx-auto bg-main-light p-3">
        <h3 className='mb-4 py-2'>Shopping Cart </h3>
        <>
          <h4 className='h6 text-center fw-bolder'>Number of Products : <span className='h6 text-main fw-bolder'>{dataDetails?.numOfCartItems}</span></h4>
          <h4 className='h6 text-center fw-bolder mb-2'>Total Cart Price : <span className='h6 text-main fw-bolder'>{dataDetails?.data.totalCartPrice} EGP</span></h4>

          {dataDetails && dataDetails?.numOfCartItems !== 0 ?
            <>
              {dataDetails?.data.products.map((product, index) =>
                <div className='row border-bottom p-2' key={index}>

                  <div className="col-md-2 d-flex align-items-center">
                    <img src={product.product.imageCover} alt={product.product.title} className='w-100' />
                  </div>

                  <div className="col-md-10">
                    <div className="d-flex justify-content-between align-align-items-center">
                      <div className='p-3'>
                        <h3 className='h6 fw-semibold'>{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                        <h6 className='mb-3 fw-semibold'>Price : <span className='fw-bolder text-main'>{product.price} EGP</span></h6>
                        <button onClick={() => removeItem(product.product.id)} className='btn border-0  p-0'><i className='fas fa-trash-can text-danger'></i> Remove </button>
                      </div>
                      <div className='d-flex flex-column p-3 justify-content-center align-items-center'>
                        <button onClick={() => updateCount(product.product.id, product.count + 1)} className='border-main rounded-2 p-2 fw-bolder'>+</button>
                        <span className='my-2'>{product.count}</span>
                        <button onClick={() => updateCount(product.product.id, product.count - 1)} className='border-main rounded-2 p-2 fw-bolder'>-</button>
                      </div>
                    </div>
                  </div>
                </div>)}
              <Link to='address' className='btn btn-success mx-auto my-4 d-block'>Check Out</Link>
            </>
            : <h3 className='mt-5 text-center fw-bold h6'><i className="fa-solid fa-cart-shopping fa-xl me-2 text-main"></i> Your Cart Is Empty</h3>}
        </ >
        {isLoading ?
          <Loading></Loading> : ''
        }
      </div>
    </>
  )
}
