import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from 'assets/banner_summer.png';
import banner2 from 'assets/banner_galaxy_ai.png';
import video3 from 'assets/video.mp4';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (current) => setCurrentSlide(current),
        ref: sliderRef
    };

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <div className="w-full relative ">
            <Slider {...settings}>
                <div>
                    <img src={banner1} alt="banner1" className="h-[400px] w-full object-cover" />
                </div>
                <div>
                    <img src={banner2} alt="banner2" className="h-[400px] w-full object-cover" />
                </div>
                <div>
                    <video controls width="865" height="400">
                        <source src={video3} type="video/mp4" />
                    </video>
                </div>
            </Slider>
            <div className="text-center mt-2 absolute left-0 top-[40%] bottom-0 flex items-center">
                <button onClick={prevSlide} className="absolute left-0 top-0 bottom-0 flex items-center justify-center bg-gray-800 rounded-full w-10 h-10 text-white hover:bg-gray-700">
                    <GoArrowLeft size={24} />
                </button>
            </div>
            <div className="text-center mt-2 absolute right-0 top-[40%] bottom-0 flex items-center">
                <button onClick={nextSlide} className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-gray-800 rounded-full w-10 h-10 text-white hover:bg-gray-700">
                    <GoArrowRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default Banner;
