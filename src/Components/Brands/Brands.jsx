import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Loading from '../Loading';
import { Helmet } from 'react-helmet';


export default function Brands() {

  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(false)

  function getAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let { data, isLoading } = useQuery('brands', getAllBrands);

  async function getBrand(id) {
    setLoading(true)
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    setBrand(data.data);
    setLoading(false)
  }


  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      {isLoading
        ? <Loading></Loading>
        : <div className="container">
          <h1 className='text-center text-main my-5 fw-bold'>All Brands</h1>
          <div className="row g-4">
            {data?.data.data.map((brand) =>
              <div className="col-md-3" key={brand._id}>
                <div onClick={() => getBrand(brand._id)} className="card" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <div className="card-img">
                    <img src={brand.image} alt={brand.slug} className='w-100' />
                  </div>
                  <div className="card-body">
                    <p className='text-center'>{brand.name}</p>
                  </div>
                </div>
              </div>
            )}
            
          </div>
          {loading
            ? <Loading></Loading>
            :
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
              aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="container">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-6">
                          <h1 className='text-main h1 fw-bolder'>{brand?.name}</h1>
                          <p>{brand?.slug}</p>
                        </div>
                        <div className="col-md-6">
                          <img src={brand?.image} alt={brand?.slug} className='w-100' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </>
  )
}
