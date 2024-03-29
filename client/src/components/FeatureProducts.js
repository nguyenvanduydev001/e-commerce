import React, { useState, useEffect } from 'react'
import { ProductCard } from './';
import { apiGetProducts } from '../apis'
import banner from '../assets/banner1.jpg'
import bannerleft from '../assets/banner-left.jpg'
import bannertop from '../assets/banner-top.jpg'
import bannerbottom from '../assets/banner-bottom.jpg'
import bannerright from '../assets/banner-right.jpg'

const FeatureProducts = () => {
    const [products, setProducts] = useState(null)

    const fetchProducts = async () => {
        const response = await apiGetProducts({ limit: 9, totalRatings: 5 })
        if (response.success) setProducts(response.products)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div className='w-full'>
            <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>FEATURED PRODUCTS</h3>
            <div className='flex flex-wrap mt-[15px] m-[-10px]'>
                {products?.map(el => (
                    <ProductCard
                        key={el.id}
                        image={el.thumb}
                        title={el.title}
                        totalRatings={el.totalRatings}
                        price={el.price}
                    />
                ))}
            </div>
            <div className='flex justify-between mt-3'>
                <img src={bannerleft}
                    alt="bannerleft"
                    className='w-[50%] object-contain'

                />
                <div className='flex flex-col justify-between w-[24%]'>
                    <img src={bannertop}
                        alt="bannertop"
                    />
                    <img src={bannerbottom}
                        alt="bannerbottom"
                    />
                </div>
                <img src={bannerright}
                    alt="banneright"
                    className='w-[24%] object-contain h-auto'
                />
            </div>
        </div>
    )
}

export default FeatureProducts