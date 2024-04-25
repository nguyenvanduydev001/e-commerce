import { InputFrom, MarkdownEditor, Select, Button, Loading } from 'components'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { validate, getBase64 } from 'utils/helpers'
import { toast } from 'react-toastify';
import { apiCreateProduct } from 'apis'
import { showModal } from 'store/app/appSlice'
import { useSelector, useDispatch } from 'react-redux'

const UpdateProduct = ({ editProduct, render }) => {
    const { categories } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()
    const [payload, setPayload] = useState({
        description: ''
    })
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })

    useEffect(() => {
        reset({
            title: editProduct?.title || '',
            price: editProduct?.price || '',
            quantity: editProduct?.quantity || '',
            color: editProduct?.color || '',
            category: editProduct?.category || '',
            brand: editProduct?.brand?.toLowerCase() || '',
        })
        setPayload({ description: typeof editProduct?.description === 'object' ? editProduct?.description?.join(',') : editProduct?.description })
        setPreview({
            thumb: editProduct?.thumb || '',
            images: editProduct?.images || []
        })
    }, [editProduct])

    const [invalidFields, setInvalidFields] = useState([])
    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])
    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file)
        setPreview(prev => ({ ...prev, thumb: base64Thumb }))
    }
    const handlePreviewImages = async (files) => {
        const imagesPreview = []
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpg') {
                toast.warning('File not supported!')
                return
            }
            const base64 = await getBase64(file)
            imagesPreview.push({ name: file.name, path: base64 })
        }
        setPreview(prev => ({ ...prev, images: imagesPreview }))

    }
    useEffect(() => {
        if (watch('thumb'))
            handlePreviewThumb(watch('thumb')[0])
    }, [watch('thumb')])
    useEffect(() => {
        if (watch('images'))
            handlePreviewImages(watch('images'))
    }, [watch('images')])
    const handleCreateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            if (data.category) data.category = categories?.find(el => el._id === data.category)?.title
            const finalPayload = { ...data, ...payload }
            const formData = new FormData()
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0])
            if (finalPayload.images) {
                for (let image of finalPayload.images) formData.append('images', image)
            }
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiCreateProduct(formData)
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
            if (response.success) {
                toast.success(response.mes)
                reset()
                setPayload({
                    thumb: '',
                    image: []
                })
            } else toast.error(response.mes)
        }
    }
    return (
        <div className='w-full flex flex-col gap-4 relative'>
            <div className='h-[69px] w-full'></div>
            <div className='p-4 border-b w-full bg-[#e5e7eb] flex justify-between items-center border-gray-300 fixed top-0'>
                <h1 className='text-3xl font-bold tracking-tight'>Manage prodcuts</h1>
            </div>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateProduct)}>
                    <InputFrom
                        label='Name product'
                        register={register}
                        errors={errors}
                        id='title'
                        validate={{
                            required: 'Need fill this field'
                        }}
                        fullWidth
                        placeholder='Name of new product'
                    />
                    <div className='w-full my-6 flex gap-4'>
                        <InputFrom
                            label='Price'
                            register={register}
                            errors={errors}
                            id='price'
                            validate={{
                                required: 'Need fill this field'
                            }}
                            style='flex-auto'
                            placeholder='Price of new product'
                            type='number'
                        />
                        <InputFrom
                            label='Quantity'
                            register={register}
                            errors={errors}
                            id='quantity'
                            validate={{
                                required: 'Need fill this field'
                            }}
                            style='flex-auto'
                            placeholder='Quantity of new product'
                            type='number'
                        />
                        <InputFrom
                            label='Color'
                            register={register}
                            errors={errors}
                            id='color'
                            validate={{
                                required: 'Need fill this field'
                            }}
                            style='flex-auto'
                            placeholder='Color of new product'
                        />
                    </div>
                    <div className='w-full my-6 flex gap-4'>
                        <Select
                            label='Category'
                            options={categories?.map(el => ({ code: el.title, value: el.title }))}
                            register={register}
                            id='category'
                            validate={{ required: 'Nedd fill this field' }}
                            style='flex-auto'
                            errors={errors}
                            fullWidth
                        />
                        <Select
                            label='Brand (Optional)'
                            options={categories?.find(el => el.title === watch('category'))?.brand?.map(el => ({ code: el.toLowerCase(), value: el }))}
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
                        invalidFiedls={invalidFields}
                        setInvaliFields={setInvalidFields}
                        value={payload.description}
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
                        {errors['images'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
                    </div>
                    {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
                        {preview.images?.map((el, idx) => (
                            <div
                                key={idx}
                                className='w-fit relative'
                            >
                                <img src={el} alt="product" className='w-[200px] object-contain' />
                            </div>
                        ))}
                    </div>}
                    <div className='my-6'>
                        <Button type='submit'>Update new product</Button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default memo(UpdateProduct)