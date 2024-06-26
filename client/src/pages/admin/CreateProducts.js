import React, { useCallback, useEffect, useState } from 'react';
import { InputFrom, Select, Button, MarkdownEditor, Loading } from 'components';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getBase64 } from 'utils/helpers';
import { apiCreateProduct } from 'apis';
import ReactLoading from "react-loading";


const validate = (payload, setInvalidFields) => {
    let invalids = 0;
    const invalidFields = [];

    Object.entries(payload).forEach(([key, value]) => {
        if (typeof value === 'string' && value.trim() === '') {
            invalidFields.push(key);
            invalids++;
        } else if (Array.isArray(value) && value.length === 0) {
            invalidFields.push(key);
            invalids++;
        } else if (!value) {
            invalidFields.push(key);
            invalids++;
        }
    });

    setInvalidFields(invalidFields);
    return invalids;
};

const CreateProducts = () => {
    const [loading, setLoading] = useState(true); // Initial loading state
    const { categories } = useSelector(state => state.app);
    const dispatch = useDispatch();
    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm();

    const [payload, setPayload] = useState({
        description: ''
    });
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    });
    const [invalidFields, setInvalidFields] = useState([]);
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái isLoading
    const changeValue = useCallback((e) => {
        setPayload(e);
    }, [payload]);

    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file);
        setPreview(prev => ({ ...prev, thumb: base64Thumb }));
    };
    useEffect(() => {
        // Show the loading spinner for 3 seconds when the component mounts
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, []);

    const handlePreviewImages = async (files) => {
        const imagesPreview = [];
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpg') {
                setNotification('File not supported!');
                return;
            }
            const base64 = await getBase64(file);
            imagesPreview.push({ name: file.name, path: base64 });
        }
        setPreview(prev => ({ ...prev, images: imagesPreview }));
    };

    useEffect(() => {
        handlePreviewThumb(watch('thumb')[0]);
    }, [watch('thumb')]);

    useEffect(() => {
        handlePreviewImages(watch('images'));
    }, [watch('images')]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000); // 3 giây

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleCreateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields);
        if (invalids === 0) {
            if (data.category) data.category = categories?.find(el => el._id === data.category)?.title;
            const finalPayload = { ...data, ...payload };
            const formData = new FormData();
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
            if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0]);
            if (finalPayload.images) {
                for (let image of finalPayload.images) formData.append('images', image);
            }
            setIsLoading(true); // Đặt trạng thái isLoading thành true
            const response = await apiCreateProduct(formData);
            setIsLoading(false); // Đặt trạng thái isLoading thành false
            if (response.success) {
                setNotification(response.mes);
                reset();
                setPayload({
                    thumb: '',
                    image: []
                });
            } else {
                setNotification(response.mes);
            }
        }
    };

    return (
        <div className='w-full bg-white'>
            {loading && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <ReactLoading
                        type="spinningBubbles"
                        color="#ee3131"
                        height={100}
                        width={50}
                    />
                </div>
            )}
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateProduct)}>
                    <InputFrom
                        label='Name product'
                        register={register}
                        errors={errors}
                        id='title'
                        validate={{ required: 'Need fill this field' }}
                        fullWidth
                        placeholder='Name of new product'
                    />
                    <div className='w-full my-6 flex gap-4'>
                        <InputFrom
                            label='Price'
                            register={register}
                            errors={errors}
                            id='price'
                            validate={{ required: 'Need fill this field' }}
                            style='flex-auto'
                            placeholder='Price of new product'
                            type='number'
                        />
                        <InputFrom
                            label='Quantity'
                            register={register}
                            errors={errors}
                            id='quantity'
                            validate={{ required: 'Need fill this field' }}
                            style='flex-auto'
                            placeholder='Quantity of new product'
                            type='number'
                        />
                        <InputFrom
                            label='Color'
                            register={register}
                            errors={errors}
                            id='color'
                            validate={{ required: 'Need fill this field' }}
                            style='flex-auto'
                            placeholder='Color of new product'
                        />
                    </div>
                    <div className='w-full my-6 flex gap-4'>
                        <Select
                            label='Category'
                            options={categories?.map(el => ({ code: el._id, value: el.title }))}
                            register={register}
                            id='category'
                            validate={{ required: 'Need fill this field' }}
                            style='flex-auto'
                            errors={errors}
                            fullWidth
                        />
                        <Select
                            label='Brand (Optional)'
                            options={categories?.find(el => el._id === watch('category'))?.brand?.map(el => ({ code: el, value: el }))}
                            register={register}
                            id='brand'
                            style='flex-auto'
                            errors={errors}
                            fullWidth
                        />
                    </div>
                    <MarkdownEditor
                        name='description'
                        changeValue={changeValue}
                        label='Description'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <div className='flex flex-col gap-2 mt-8'>
                        <label className='font-semibold' htmlFor="thumb">Upload thumb</label>
                        <input
                            type="file"
                            id="thumb"
                            {...register('thumb', { required: 'Need fill' })}
                        />
                        {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
                    </div>
                    {preview.thumb && <div className='my-4'>
                        <img src={preview.thumb} alt="thumbnail" className='w-[200px] object-contain' />
                    </div>}
                    <div className='flex flex-col gap-2 mt-8'>
                        <label className='font-semibold' htmlFor="products">Upload images of product</label>
                        <input
                            type="file"
                            id="products"
                            multiple
                            {...register('images', { required: 'Need fill' })}
                        />
                        {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
                    </div>
                    {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
                        {preview.images?.map((el, idx) => (
                            <div
                                key={idx}
                                className='w-fit relative'
                            >
                                <img src={el.path} alt="product" className='w-[200px] object-contain' />
                            </div>
                        ))}
                    </div>}
                    <div className='my-6'>
                        <Button type='submit'>Create new product</Button>
                    </div>
                </form>
                {notification && <div className='mt-4 text-center text-green-500'>{notification}</div>}
                {isLoading && <div className='mt-4 text-center text-blue-500'>Loading...</div>}
            </div>
        </div>
    );
};

export default CreateProducts;