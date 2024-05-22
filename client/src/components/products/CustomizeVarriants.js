import React, { memo, useEffect, useState } from "react";
import { apiAddVarriant } from "apis";
import Button from "components/buttons/Button";
import InputFrom from "components/inputs/InputFrom";
import { useForm } from 'react-hook-form'
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getBase64 } from "utils/helpers";
import ReactLoading from "react-loading";


const CustomizeVarriants = ({ customizeVarriant, setCustomizeVarriant, render }) => {
    const [preview, setPreview] = useState({
        thumb: '', images: ''
    })
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()
    useEffect(() => {
        reset({
            title: customizeVarriant?.title || '',
            color: customizeVarriant?.color || '',
            price: customizeVarriant?.price || '',
        })
    }, [customizeVarriant])
    const [loading, setLoading] = useState(true); // Initial loading state
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái isLoading
    useEffect(() => {
        // Show the loading spinner for 3 seconds when the component mounts
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, []);
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000); // 3 giây

            return () => clearTimeout(timer);
        }
    }, [notification]);
    const handleAddVarriant = async (data) => {
        if (data.color === customizeVarriant.color) Swal.fire('Oops!', 'Color not changed', 'info')
        else {
            const formData = new FormData()
            for (let i of Object.entries(data)) formData.append(i[0], i[1])
            if (data.thumb) formData.append('thumb', data.thumb[0])
            if (data.images) {
                for (let image of data.images) formData.append('images', image)
            }
            setIsLoading(true); // Đặt trạng thái isLoading thành true
            const response = await apiAddVarriant(formData, customizeVarriant._id)
            setIsLoading(false); // Đặt trạng thái isLoading thành false
            if (response.success) {
                setNotification(response.mes);
                reset()
                setPreview({ thumb: '', images: [] })
            } else {
                setNotification(response.mes);
            }

        }
    }
    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file)
        setPreview(prev => ({ ...prev, thumb: base64Thumb }))
    }
    const handlePreviewImages = async (files) => {
        const imagesPreview = []
        for (let file of files) {
            console.log(file)
            if (file.type !== 'image/png' && file.type !== 'image/jpg') {
                setNotification('File not supported!')
                return
            }
            const base64 = await getBase64(file)
            imagesPreview.push(base64)
        }
        setPreview(prev => ({ ...prev, images: imagesPreview }))
    }
    useEffect(() => {
        if (watch('thumb') instanceof FileList && watch('thumb').length > 0)
            handlePreviewThumb(watch('thumb')[0])
    }, [watch('thumb')])
    useEffect(() => {
        if (watch('images') instanceof FileList && watch('images').length > 0)
            handlePreviewImages(watch('images'))
    }, [watch('images')])
    return (
        <div className="w-full flex flex-col gap-4 relative bg-white">
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
            <div className="h-[69px] w-full"></div>
            <div className="p-4 border-b bg-white flex justify-between items-center border-gray-300 fixed top-0 left-[327px] right-0 z-50">
                <h1 className="text-3xl font-bold tracking-tight">Customize variants of products</h1>
                <span
                    className="text-main hover:underline cursor-pointer"
                    onClick={() => setCustomizeVarriant(null)}
                >
                    Back
                </span>
            </div>
            <div className="bg-white w-[90%] mx-auto my-9 border rounded-md shadow-md">
                <form onSubmit={handleSubmit(handleAddVarriant)} className="p-4 w-full flex gap-4 flex-col">
                    <div className="flex gap-4 items-center w-full">
                        <InputFrom
                            label="Original name"
                            register={register}
                            errors={errors}
                            id="title"
                            fullWidth
                            style="flex-auto"
                            validate={{
                                require: "Need fill this field",
                            }}
                            placeholder="Title of variant"
                        />
                    </div>
                    <div className="flex gap-4 items-center">
                        <InputFrom
                            label="Price variant"
                            register={register}
                            errors={errors}
                            id="price"
                            validate={{
                                require: "Need fill this field",
                            }}
                            fullWidth
                            placeholder="Price of new variant"
                            type="number"
                            style="flex-auto"
                        />
                        <InputFrom
                            label="Color variant"
                            register={register}
                            errors={errors}
                            id="color"
                            validate={{
                                require: "Need fill this field",
                            }}
                            fullWidth
                            placeholder="Color of new variant"
                            style="flex-auto"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-8">
                        <label className="font-semibold" htmlFor="thumb">Upload thumb</label>
                        <input
                            type="file"
                            id="thumb"
                            {...register("thumb", { required: "Need fill" })}
                        />
                        {errors.thumb && <small className="text-xs text-red-500">{errors.thumb?.message}</small>}
                    </div>
                    {preview.thumb && (
                        <div className="my-4">
                            <img src={preview.thumb} alt="thumbnail" className="w-[200px] object-contain" />
                        </div>
                    )}
                    <div className="flex flex-col gap-2 mt-8">
                        <label className="font-semibold" htmlFor="products">Upload images of product</label>
                        <input
                            type="file"
                            id="products"
                            multiple
                            {...register("images", { required: "Need fill" })}
                        />
                        {errors.images && <small className="text-xs text-red-500">{errors.images?.message}</small>}
                    </div>
                    {preview.images.length > 0 && (
                        <div className="my-4 flex w-full gap-3 flex-wrap">
                            {preview.images?.map((el, idx) => (
                                <div key={idx} className="w-fit relative">
                                    <img src={el} alt="product" className="w-[200px] object-contain" />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="my-6">
                        <Button type="submit">Add variant</Button>
                    </div>

                </form>
                {notification && <div className='mt-4 text-center text-green-500'>{notification}</div>}
                {isLoading && <div className='mt-4 text-center text-blue-500 flex justify-center items-center'><ReactLoading type="bubbles" color="#0000FF"
                    height={100} width={50} className="" />
                </div>}
            </div>
        </div>

    )
}

export default memo(CustomizeVarriants)