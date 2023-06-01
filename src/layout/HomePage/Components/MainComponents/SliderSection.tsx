import React from 'react'
import Slider from "react-slick";
import Image1 from '../../../../assets/Images/Slider/1.webp'
import Image2 from '../../../../assets/Images/Slider/2.webp'
import Image3 from '../../../../assets/Images/Slider/3.gif'


export const SliderSection = () => {
    let settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
    };

    return (
      <div className='cursor-pointer border-y border-y-gray-500'>
        <Slider {...settings}>
          <div>
            <img src={Image1} />
          </div>
          <div>
            <img src={Image2} />
          </div>
          <div>
            <img src={Image3} />
          </div>
        </Slider>
      </div>
    )
}
