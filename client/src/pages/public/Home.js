import React, { useEffect, useState } from 'react'
import { Banner, Sidebar, BestSeller } from '../../components'

const Home = () => {


    return (
        <div className='w-main flex '>
            <div className='flex flex-col gap-5 w-[20%] flex-auto '>
                <Sidebar />
                <span>Deal dailt</span>
            </div>
            <div className='flex flex-col gap-5 pl-5 w-[80%] flex-auto '>
                <Banner />
                <BestSeller />
            </div>
        </div>
    )
}

export default Home