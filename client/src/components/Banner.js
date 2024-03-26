import React from 'react'
import banner from '../assets/banner.jpg'

const Banner = () => {
    return (
        <div className='w-full'>
            <img src={banner} alt="banner" className='w-full object-contain' />
        </div>
    )
}

export default Banner