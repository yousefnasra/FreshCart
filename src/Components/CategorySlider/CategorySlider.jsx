import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";
import { WishListContext } from '../../Context/WishListContext';


export default function CategorySlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    }

    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    let { data } = useQuery('CategorySlider', getCategories);

    return (
        <>
            {data?.data.data
                ? <div className='py-4 container'>
                    <Slider {...settings}>
                        {data?.data.data.map((category) => <div key={category._id} >
                            <img height={150} src={category.image} alt={category.name} className='w-100 mb-2' />
                            <p className='text-center fs-6'>{category.name}</p>
                        </div>)}
                    </Slider>
                </div>
                : ''
            }
        </>
    )
}
