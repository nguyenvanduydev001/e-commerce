import React from 'react'
import { InputFrom, Select, Button } from 'components'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const CreateProducts = () => {
    const { categories } = useSelector(state => state.app)
    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm()
    const handleCreateProduct = (data) => {
        if (data.category) data.category = categories?.find(el => el._id === data.category)?.title
        console.log(data)
    }

    return (
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-gray-300'>
                <span>Create New Product</span>
            </h1>
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
                            id='title'
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
                            options={categories?.map(el => ({ code: el._id, value: el.title }))}
                            register={register}
                            id='category'
                            validate={{ required: 'Nedd fill this field' }}
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
                    <Button type='submit'>Create new product</Button>
                </form>
            </div>
        </div>
    )
}

export default CreateProducts 