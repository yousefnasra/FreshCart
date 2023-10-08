import React from 'react'
import slider1 from "../../assets/images/slider-image-3.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/slider-image-1.jpeg"
import banner1 from "../../assets/images/598.jpeg"
import banner2 from "../../assets/images/15161-min.jpeg"
import Slider from 'react-slick'


export default function MainSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        pauseOnHover: false
    };

    return (
        <div className="container">
            <div className="row gx-0">
                <div className="col-md-10 col-12">
                    <Slider {...settings}>
                        <img height={300} src={slider1} alt="hero one" className='w-100' />
                        <img height={300} src={slider2} alt="hero two" className='w-100' />
                        <img height={300} src={slider3} alt="hero three" className='w-100' />
                    </Slider >
                </div>
                <div className="col-md-2 col-12">
                    <div className="row gx-0">
                        <div className="col-md-12 col-6">
                            <img height={150} src={banner1} alt="banner one" className='w-100' />
                        </div>
                        <div className="col-md-12 col-6">
                            <img height={150} src={banner2} alt="banner two" className='w-100' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
