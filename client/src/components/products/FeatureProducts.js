import React, { useState, useEffect, memo } from 'react'
import { ProductCard } from '../';
import { apiGetProducts } from 'apis'
import bannerleft from 'assets/banner-left.jpg'
import bannertop from 'assets/banner-top.jpg'
import bannerbottom from 'assets/banner-bottom.jpg'
import bannerright from 'assets/banner-right.jpg'

const FeatureProducts = () => {
    const [products, setProducts] = useState(null)

    const fetchProducts = async () => {
        const response = await apiGetProducts({ limit: 9, sort: '-totalRatings' })
        if (response.success) setProducts(response.products)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div className='w-main'>
            <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>FEATURED PRODUCTS</h3>
            <div className='flex flex-wrap mt-[15px] m-[-10px] mb-[-5px]'>
                {products?.map(el => (
                    <ProductCard
                        key={el._id}
                        image={el.thumb}
                        title={el.title}
                        totalRatings={el.totalRatings}
                        price={el.price}
                    />
                ))}
            </div>
            <div className='grid grid-cols-4 grid-rows-2 gap-4'>
                <img src={bannerleft}
                    alt="bannerleft"
                    className='w-full h-full object-cover col-span-2 row-span-2'
                />
                <img src={bannertop}
                    alt="bannertop"
                    className='w-full h-full object-cover col-span-1 row-span-1'
                />
                <img src={bannerright}
                    alt="banneright"
                    className='w-full h-full object-cover col-span-1 row-span-2'
                />
                <img src={bannerbottom}
                    alt="bannerbottom"
                    className='w-full h-full object-cover col-span-1 row-span-1'
                />

            </div>
        </div>
    )
}

export default memo(FeatureProducts)