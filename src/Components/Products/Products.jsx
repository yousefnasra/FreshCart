import React from 'react'
import { Helmet } from 'react-helmet';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'

export default function Products() {


  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <FeaturedProducts></FeaturedProducts>
    </>
  )
}
