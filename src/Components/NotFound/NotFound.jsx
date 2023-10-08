import React from 'react'
import img from '../../assets/error.svg'
import { useNavigate } from 'react-router-dom';
export default function NotFound() {

  let navigate = useNavigate();
  if (window.location.href === "https://yousefnasra.github.io/FreshCart/allorders") {
    navigate('/allorders')
  }

  return (
    <div className='w-50 mx-auto my-3 text-center'>
      <h2 className='my-3'>Page Not Found</h2>
      <img src={img} alt="Error 404 Page Not Found" className='my-4 w-100' />
    </div>
  )
}
