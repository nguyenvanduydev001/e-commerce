import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProduct } from '../../apis';
import { Breadcrumd, Button, SelectQuantity } from '../../components'
import Slider from 'react-slick'
import ReactImageZoom from 'react-image-zoom';
import { formatMoney, fotmatPrice, renderStartFromNumber } from '../../utils/helpers'

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
    const [quantity, setQuantity] = useState(1)
    const fetchProductData = async () => {
        const response = await apiGetProduct(pid)
        if (response.success) setProduct(response.createProduct)      //productData   //createProduct
    }
    useEffect(() => {
        if (pid) fetchProductData()
    }, [pid])

    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) {
            return
        } else {
            setQuantity(number)
        }
    }, [quantity])
    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) return
        if (flag === 'minus') setQuantity(prev => +prev - 1)
        if (flag === 'plus') setQuantity(prev => +prev + 1)
    }, [quantity])
    return (
        <div className='w-full'>
            <div className='h-[81px] flex justify-center items-center bg-gray-100'>
                <div className='w-main'>
                    <h3 className='font-semibold'>{title}</h3>
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
                <div className='w-2/5 pr-[24px] flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-[30px] font-semibold'>{`${formatMoney(fotmatPrice(product?.price))} VNĐ`}</h2>
                        <span className='text-sm text-main'>{`Kho: ${product?.quantity}`}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        {renderStartFromNumber(product?.totalRatings)?.map((el, index) => (<span key={index}>{el}</span>))}
                        <span className='text-sm text-main italic'>{`(Đã bán: ${product?.sold} cái)`}</span>
                    </div>
                    <ul className='text-sm list-square text-gray-500 pl-4'>
                        {product?.description?.map(el => (<li className='leading-6' key={el}>{el}</li>))}
                    </ul>
                    <div className='flex flex-col gap-8'>
                        <SelectQuantity
                            quantity={quantity}
                            handleQuantity={handleQuantity}
                            handleChangeQuantity={handleChangeQuantity}
                        />
                        <Button fw>
                            Add to Cart
                        </Button>
                    </div>
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
