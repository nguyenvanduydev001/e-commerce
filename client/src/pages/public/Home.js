import React from 'react'
import { Banner, Sidebar, BestSeller, DealDaily, FeatureProducts, CustomSlider } from '../../components'
import { useSelector } from 'react-redux'
import icons from '../../utils/icons'
import withBaseComponent from 'hocs/withBaseComponent'
import { createSearchParams } from 'react-router-dom'

const { IoIosArrowForward } = icons
const Home = ({ navigate }) => {
    const { newProducts } = useSelector(state => state.products)
    const { categories } = useSelector(state => state.app)
    const { isLoggedIn, current } = useSelector(state => state.user)


    return (
        <div className='w-main'>
            <div className='w-main flex mt-6'>
                <div className='flex flex-col gap-5 w-[25%] flex-auto '>
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto '>
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className='my-8'>
                <FeatureProducts />
            </div>
            <div className='my-8'>
                <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>NEW ARRIVALS</h3>
                <div className=' mt-4 mx-[-10px]'>
                    <CustomSlider
                        products={newProducts}
                    />
                </div>
            </div>
            <div className='my-8 w-full'>
                <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>HOT COLLECTIONS</h3>
                <div className='flex flex-wrap gap-4 mt-4'>
                    {categories?.filter(el => el.brand.length > 0).map(el => (
                        <div
                            key={el._id}
                            className='w-[382px]'
                        >
                            <div className='border flex p-4 gap-4 min-h-[190px]'>
                                <img src={el?.image} alt="" className='flex-1 w-[144px] h-[129px] object-cover' />
                                <div className='flex-1 text-gray-700'>
                                    <h4 className='font-semibold uppercase'>{el.title}</h4>
                                    <ul className='text-sm'>
                                        {el?.brand?.map(item => (
                                            <span
                                                key={item}
                                                className='flex gap-1 cursor-pointer hover:underline items-center text-gray-500'
                                                onClick={() =>
                                                    navigate({
                                                        pathname: `/${el.title}`,
                                                        search: createSearchParams({
                                                            brand: item,
                                                        }).toString()
                                                    })
                                                }
                                            >
                                                <IoIosArrowForward size={14} />
                                                <li>{item}</li>
                                            </span>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='my-8 w-full'>
                <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>BLOG POSTS</h3>
                <div className='blog-posts-container flex space-x-4 my-2 overflow-x-auto hide-scrollbar'>
                    <div className='blog-post w-1/3 flex-shrink-0 p-4 border border-gray-300'>
                        <img src='https://digital-world-2.myshopify.com/cdn/shop/articles/blog1.jpg?v=1492594896' alt='Blog post image' className='w-full h-48 object-cover mb-4' />
                        <h4 className='text-xl font-bold'>THESE ARE THE 5 BEST PHONES YOU CAN BUY RIGHT NOW</h4>
                        <p className='text-gray-500'>December 13, 2016 | 1 comment</p>
                        <p>From high-priced pocket-busters to our favorite budget beauties. You're up to date on everything you need to know before buying a phone, and now the...</p>
                    </div>
                    <div className='blog-post w-1/3 flex-shrink-0 p-4 border border-gray-300'>
                        <img src='https://digital-world-2.myshopify.com/cdn/shop/articles/blog13.jpg?v=1492595088' alt='Blog post image' className='w-full h-48 object-cover mb-4' />
                        <h4 className='text-xl font-bold'>THESE ARE THE 5 BEST PHONES YOU CAN BUY RIGHT NOW</h4>
                        <p className='text-gray-500'>December 13, 2016 | 1 comment</p>
                        <p>From high-priced pocket-busters to our favorite budget beauties. You're up to date on everything you need to know before buying a phone, and now the...</p>
                    </div>
                    <div className='blog-post w-1/3 flex-shrink-0 p-4 border border-gray-300'>
                        <img src='https://digital-world-2.myshopify.com/cdn/shop/articles/blog12.jpg?v=1492595082' alt='Blog post image' className='w-full h-48 object-cover mb-4' />
                        <h4 className='text-xl font-bold'>THESE ARE THE 5 BEST PHONES YOU CAN BUY RIGHT NOW</h4>
                        <p className='text-gray-500'>December 13, 2016 | 1 comment</p>
                        <p>From high-priced pocket-busters to our favorite budget beauties. You're up to date on everything you need to know before buying a phone, and now the...</p>
                    </div>
                </div>
            </div>

            <div class="my-3 w-full">
                <h3 class='text-3xl font-semibold py-4 border-b-2 border-main'>TRADEMARK</h3>
                <div class="brand-images-container flex overflow-x-auto space-x-4 py-4 justify-center scrollbar-hidden">
                    <div class="flex-shrink-0 p-2">
                        <img src="https://digital-world-2.myshopify.com/cdn/shop/files/logo-5_large_large_2629fcad-3956-4ce9-9265-c2e31d94a8c5_160x160.png?v=1613166661" alt="Brand 1" class="w-28 h-28 object-contain" />
                    </div>
                    <div class="flex-shrink-0 p-2">
                        <img src="https://digital-world-2.myshopify.com/cdn/shop/files/logo-4_large_large_f4d00a02-3fbf-4bf1-81a6-daec160e076f_160x160.png?v=1613166661" alt="Brand 2" class="w-28 h-28 object-contain" />
                    </div>
                    <div class="flex-shrink-0 p-2">
                        <img src="https://digital-world-2.myshopify.com/cdn/shop/files/logo-3_large_large_3c4606a2-a297-403f-98ec-271ece5c40db_160x160.png?v=1613166661" alt="Brand 3" class="w-28 h-28 object-contain" />
                    </div>
                    <div class="flex-shrink-0 p-2">
                        <img src="https://digital-world-2.myshopify.com/cdn/shop/files/logo-1_large_large_768f374b-12c0-4dd0-b9ef-7585f08cdc38_160x160.png?v=1613166661" alt="Brand 4" class="w-28 h-28 object-contain" />
                    </div>
                    <div class="flex-shrink-0 p-2">
                        <img src="https://digital-world-2.myshopify.com/cdn/shop/files/logo-2_large_large_1c0f984f-9760-4b73-866e-10b9d225d851_160x160.png?v=1613166661" alt="Brand 5" class="w-28 h-28 object-contain" />
                    </div>
                    <div class="flex-shrink-0 p-2">
                        <img src="https://digital-world-2.myshopify.com/cdn/shop/files/logo-7_large_large_de3782ee-9ae1-44b9-b73f-0a77d9c266ee_160x160.png?v=1613166661" alt="Brand 6" class="w-28 h-28 object-contain" />
                    </div>
                    <div class="flex-shrink-0 p-2">
                        <img src="https://digital-world-2.myshopify.com/cdn/shop/files/logo-6_large_large_e49d4a97-fd54-48c7-9865-8fc912607190_160x160.png?v=1613166661" alt="Brand 6" class="w-28 h-28 object-contain" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(Home)