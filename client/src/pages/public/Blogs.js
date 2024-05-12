import React from 'react';
import { Helmet } from 'react-helmet';

const Blogs = () => {
    return (
        <div>
            <div className="w-main bg-white py-6">
                <div className="container mx-auto ">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Sidebar */}
                        <div className=" hidden lg:block">
                            {/* Sidebar Content Here */}
                            <div className="bg-white border rounded-lg shadow-md p-6">
                                <h2 className="text-xl pb-2 font-semibold border-b text-main mb-4">RECENT ARTICLES</h2>
                                <ul>
                                    <li className="text-gray-800 font-medium hover:text-main"><a href="#">These are the 5 best phones you can buy right now </a></li>
                                    <li className="text-gray-300 text-sm font-medium mb-[5px] hover:text-main"><a href="#">Dec 13, 2016 </a></li>
                                    <li className="text-gray-800 font-medium hover:text-main"><a href="#">Apple's new TV app goes live with unified search</a></li>
                                    <li className="text-gray-300 text-sm font-medium mb-[5px] hover:text-main"><a href="#">Dec 13, 2016</a></li>
                                    <li className="text-gray-800 font-medium hover:text-main"><a href="#">In 2017, your phone's camera will have superpowers</a></li>
                                    <li className="text-gray-300 text-sm font-medium mb-[5px] hover:text-main"><a href="#">Dec 13, 2016</a></li>
                                </ul>
                            </div>
                            <div className="mt-4 w-full">
                                <img src="https://digital-world-2.myshopify.com/cdn/shop/files/9069783_orig_400x_5a30224e-9dc2-442a-85fd-0b09a896a89a_400x.jpg?v=1613168570" alt="Blog" className="w-full  object-cover object-center h-full" />
                            </div>
                        </div>
                        {/* Blog Posts */}
                        <div className="col-span-2">
                            {/* Blog Post 1 */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 flex border">
                                <div className="w-1/2">
                                    <img src="https://digital-world-2.myshopify.com/cdn/shop/articles/blog7_1024x1024.jpg?v=1492594963" alt="Blog" className="w-full  object-cover object-center h-full" />
                                </div>
                                <div className="w-1/2 p-6">
                                    <h2 className="text-lg font-semibold text-gray-800 ">THE STANDARD LOREM IPSUM PASSAGE, USED SINCE THE 1500S</h2>
                                    <span className='py-2 text-gray-300 text-sm'>By Tada Theme Apr 14, 2017</span>
                                    <p className="text-gray-600">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia dolore consequuntur magni dolores eos...</p>
                                    <a href="#" className="text-main mt-4 inline-block">Read more</a>
                                </div>
                            </div>

                            {/* Blog Post 2 */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 flex border">
                                <div className="w-1/2">
                                    <img src="https://digital-world-2.myshopify.com/cdn/shop/articles/blog6_1024x1024.jpg?v=1492594956" alt="Blog" className="w-full object-cover object-center h-full" />
                                </div>
                                <div className="w-1/2 p-6">
                                    <h2 className="text-lg font-semibold text-gray-800 ">SECTION 1.10.33 OF DE FINIBUS BONORUM ET MALORUM, WRITTEN BY CICERO IN 45 BC</h2>
                                    <span className='py-2 text-gray-300 text-sm'>By Tada Theme Apr 14, 2017</span>
                                    <p className="text-gray-600">Shoe street style leather tote oversized sweatshirt A.P.C. Prada Saffiano crop slipper denim shorts spearmint. Braid skirt round sunglasses seam leather vintage Levi plaited. Flats holographic Acne grunge collarless denim chunky sole cuff tucked t-shirt strong eyebrows. Clutch center part dress dungaree slip dress. Skinny jeans knitwear minimal tortoise-shell sunglasses...</p>
                                    <a href="#" className="text-main mt-4 inline-block">Read more</a>
                                </div>
                            </div>
                            {/* Blog Post 3 */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 flex border">
                                <div className="w-1/2">
                                    <img src="https://digital-world-2.myshopify.com/cdn/shop/articles/blog5_1024x1024.jpg?v=1492594950" alt="Blog" className="w-full h-full object-cover object-center" />
                                </div>
                                <div className="w-1/2 p-6">
                                    <h2 className="text-lg font-semibold text-gray-800 ">QUISQUE PORTA FELIS EST UT MALESUADA LOREM DIGNISSIM</h2>
                                    <span className='py-2 text-gray-300 text-sm'>By Tada Theme Apr 14, 2017</span>
                                    <p className="text-gray-600">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia dolore consequuntur magni dolores eos...</p>
                                    <a href="#" className="text-main mt-4 inline-block">Read more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blogs;
