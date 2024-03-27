import React from 'react'
import { Banner, Sidebar } from '../../components'

const Home = () => {
    return (
        <div className='w-main flex '>
            <div className='flex flex-col gap-5 w-[20%] flex-auto '>
                <Sidebar />
                <span>Deal dailt</span>
            </div>
            <div className='flex flex-col gap-5 pl-5 w-[80%] flex-auto '>
                <Banner />
                <span>Best seller</span>
            </div>
        </div>
    )
}

export default Home