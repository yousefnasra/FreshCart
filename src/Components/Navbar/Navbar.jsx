import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/freshcart-logo.svg'
import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'



export default function Navbar() {

  let { userToken, setUserToken } = useContext(UserContext);
  let { cartItemsNum } = useContext(CartContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to='/'>
          <img src={logo} alt="FreshMarket logo" />
        </Link>

        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavId">

          {userToken ?
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink to='/' className="nav-link active" >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='products' className="nav-link" >Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='wishlist' className="nav-link" >Wish List</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='categories' className="nav-link" >Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='brand' className="nav-link" >Brands</NavLink>
              </li>
            </ul>
            : ""}

          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {userToken ?
              <>
                <li className="nav-item position-relative mx-auto my-1 my-md-0">
                  <Link to='cart' className="nav-link" >
                    <i className="fa-solid fa-cart-shopping fs-3"></i>
                    <div className="badge position-absolute text-white top-0 end-0 bg-main">{cartItemsNum}</div>
                  </Link>
                </li>
                <li className="nav-item mx-auto ms-md-2">
                  <span onClick={() => logOut()} className="nav-link cursor-pointer" >Logout</span>
                </li>
              </>
              : <>
                <li className="nav-item">
                  <Link to='login' className="nav-link" >Login</Link>
                </li>
                <li className="nav-item">
                  <Link to='register' className="nav-link" >Register</Link>
                </li>
              </>
            }

          </ul>

        </div>
      </div>
    </nav>

  )
}
