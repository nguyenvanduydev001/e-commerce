import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProduct } from '../../apis';
import { Breadcrumd } from '../../components'
import Slider from 'react-slick'
import ReactImageZoom from 'react-image-zoom';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const DetailProduct = () => {

    const { pid, title, category } = useParams()
    const [product, setProduct] = useState(null)
    const fetchProductData = async () => {
        const response = await apiGetProduct(pid)
        if (response.success) setProduct(response.createProduct)      //productData   //createProduct
    }
    useEffect(() => {
        if (pid) fetchProductData()
    }, [pid])
    return (
        <div className='w-full'>
            <div className='h-[81px] flex justify-center items-center bg-gray-100'>
                <div className='w-main'>
                    <h3>{title}</h3>
                    <Breadcrumd title={title} category={category} />
                </div>
            </div>
            <div className='w-main m-auto mt-4 flex'>
                <div className='flex flex-col gap-4 w-2/5'>
                    <div className='w-[458px] border object-cover'>
                        {product && (
                            <ReactImageZoom {...{
                                border: 1,
                                width: 458,
                                height: 458,
                                zoomWidth: 400,
                                img: product?.images // Sử dụng ảnh đầu tiên trong danh sách ảnh
                            }} />
                        )}
                    </div>
                    <div className='w-[458px]'>
                        <Slider className='image-slider' {...settings}>
                            {product?.images?.map(el => (
                                <div className='flex w-full gap-2' key={el}>
                                    <img src={el} alt='sub-product' className='h-[143px] w-[143px] border object-cover' />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='border border-red-300 w-2/5'>
                    price
                </div>
                <div className='border border-green-300 w-1/5'>
                    information
                </div>
            </div>
            <div className='h-[500px] w-full'></div>
        </div>
    );
}

export default DetailProduct;
