import React from 'react'
import Slider from 'react-slick';
import slider1 from '../../assets/slide-1.jpg'
import slider2 from '../../assets/slider-2.jpg'

export default function LandingPage() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        
      };
  return <>
    <div>
        <Slider {...settings}> 
            <div className='px-5 lg:px-0'>
            <section className="w-full relative rounded-lg py-16 overflow-hidden mb-6">
        <div className="absolute inset-0 z-[1]">
            <img className="h-full w-full object-cover object-center" src={slider1} alt="" />
        </div>
        <div className="max-w-[120rem] mx-auto h-full relative z-[2] px-6 md:px-8 lg:px-10">
            <div className="h-full w-full  flex flex-col  relative space-y-6">
                <div className="mt-auto mb-0  md:py-16 space-y-6">
                    <span className="font-light text-sm text-accent-500 bg-orange-500 px-1 rounded-lg text-white "> Opening Sale Discount 50% </span>
                    <h1 className="text-3xl md:text-5xl max-w-[30rem] text-green-950 font-bold">SuperMarket For Fresh Grocery</h1>
                    <p className="max-w-[30rem]  font-semibold ml-4 before:content-[''] relative before:absolute before:w-px before:h-full before:left-0 before:top-0 before:-translate-x-4 before:bg-accent-500 md:text-base text-sm">
                        Introduced a new model for online grocery shopping and convenient home delivery.
                    </p>
                </div>
            </div>
        </div>
        </section>
            </div>


            <div className='px-5 lg:px-0'>
        <section className="w-full relative rounded-lg py-16 overflow-hidden mb-6">
        <div className="absolute inset-0 z-[1]">
            <img className="h-full w-full object-cover object-center" src={slider2} alt="" />
        </div>
        <div className="max-w-[120rem] mx-auto h-full relative z-[2] px-6 md:px-8 lg:px-10">
            <div className="h-full w-full  flex flex-col  relative space-y-6">
                <div className="mt-auto mb-0  md:pt-16 md:pb-24 space-y-6">
                    <span className="font-light text-sm text-accent-500 bg-orange-500 px-1 rounded-lg text-white "> Opening Sale Discount 50% </span>
                    <h1 className="text-3xl md:text-5xl l max-w-[30rem] text-green-950 font-bold">
                        Free Shipping on 
                        orders over <span className='text-green-800'> $100</span>
                    </h1>
                    <p className="max-w-[30rem]  font-semibold ml-4 before:content-[''] relative before:absolute before:w-px before:h-full before:left-0 before:top-0 before:-translate-x-4 before:bg-accent-500 md:text-base text-sm">
                        Free Shipping to First-Time Customers Only, After promotions and discounts are applied.
                    </p>
                </div>
            </div>
        </div>
        </section>
        </div>
        </Slider>
    </div>
  </>
}
