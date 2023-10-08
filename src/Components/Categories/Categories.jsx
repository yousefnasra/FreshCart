import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Loading from '../Loading';
import { Helmet } from 'react-helmet';

export default function Categories() {

  const [subCategories, setSubCategories] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [loading, setLoading] = useState(false)


  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let { data, isLoading } = useQuery('Category', getCategories);

  async function getSubCategories(id) {
    setLoading(true)
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    getCategoryName(id)
    setSubCategories(data.data);
    setLoading(false)
  }

  async function getCategoryName(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    setCategoryName(data.data.name);
  }
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      {isLoading
        ? <Loading></Loading>
        : <div className="container">
          <div className="row g-4">
            {data?.data.data.map((category) =>
              <div className="col-md-4" key={category._id}>
                <div onClick={() => getSubCategories(category._id)} className="card cursor-pointer">
                  <div className="card-img">
                    <img height={300} src={category.image} alt={category.name} className='w-100 ratio-4x3' />
                  </div>
                  <div className="card-body">
                    <p className='text-center h3 text-main fw-bold'>{category.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      }

      {loading
        ? <Loading></Loading>
        : subCategories
          ? <>
            <div className="container">
              <h2 className='text-center text-main my-4 fw-bold'> {categoryName} Subcategories</h2>
              <div className="row gy-3">
                {subCategories.map((sub) =>
                  <div className="col-md-4" key={sub._id}>
                    <div className="card">
                      <p className='h3 text-center p-3 fw-bold'>
                        {sub.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ >
          : ''
      }

    </>
  )
}
