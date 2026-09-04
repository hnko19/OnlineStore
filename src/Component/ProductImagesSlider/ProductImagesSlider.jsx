import React from 'react';
import Slider from "react-slick";

export default function ProductImagesSlider({images}) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return <>
    <Slider {...settings}>
        {
            images?.map((img , index) => {
                return <img key={index} className="h-full rounded-md object-contain border mx-auto" src={img} alt="Nike Air" />
            })
        }
    </Slider>
  </>
}
