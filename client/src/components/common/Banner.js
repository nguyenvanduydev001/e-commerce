import React, { memo } from 'react'
// import banner from '../assets/banner1.jpg'
import banner from 'assets/banner1.jpg'

const Banner = () => {
    return (
        <div className='w-full '>
            <img src={banner} alt="banner" className='h-[400px] w-full object-cover ' />
        </div>
    )
}

export default memo(Banner)