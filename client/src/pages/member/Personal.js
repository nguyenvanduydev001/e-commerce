import { Button, InputFrom } from 'components';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import avatar from 'assets/avatarDefault.png';
import { apiUpdateCurrent } from 'apis';
import { getCurrent } from 'store/user/asyncActions';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import withBaseComponent from 'hocs/withBaseComponent';

const Personal = ({ navigate }) => {
    const { register, formState: { errors, isDirty }, handleSubmit, reset } = useForm();
    const { current } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        reset({
            firstname: current?.firstname,
            lastname: current?.lastname,
            mobile: current?.mobile,
            email: current?.email,
            avatar: current?.avatar,
            address: current?.address,
        });
    }, [current]);

    const handleUpdateInfor = async (data) => {
        const formData = new FormData();
        if (data.avatar.length > 0) formData.append('avatar', data.avatar[0]);
        delete data.avatar;
        for (let i of Object.entries(data)) formData.append(i[0], i[1]);

        const response = await apiUpdateCurrent(formData);
        if (response.success) {
            dispatch(getCurrent());
            toast.success(response.mes);
            if (searchParams.get('redirect')) navigate(searchParams.get('redirect'));
        } else toast.error(response.mes);
    };

    return (
        <div className='w-full relative px-4 py-8 bg-gray-50 min-h-screen'>
            <form onSubmit={handleSubmit(handleUpdateInfor)} className='w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md flex flex-col gap-6'>
                <div className='flex flex-col items-center'>
                    <span className='font-medium text-lg'>Profile Image</span>
                    <label htmlFor="file" className='cursor-pointer'>
                        <img src={current?.avatar || avatar} alt="avatar" className='w-24 h-24 object-cover rounded-full border-2 border-gray-300' />
                    </label>
                    <input type="file" id='file' {...register('avatar')} hidden multiple={false} />
                </div>
                <InputFrom
                    label='First Name'
                    register={register}
                    errors={errors}
                    id='firstname'
                    validate={{
                        required: 'This field is required'
                    }}
                />
                <InputFrom
                    label='Last Name'
                    register={register}
                    errors={errors}
                    id='lastname'
                    validate={{
                        required: 'This field is required'
                    }}
                />
                <InputFrom
                    label='Email Address'
                    register={register}
                    errors={errors}
                    id='email'
                    validate={{
                        required: 'This field is required',
                        pattern: { value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, message: 'Invalid email' }
                    }}
                />
                <InputFrom
                    label='Phone'
                    register={register}
                    errors={errors}
                    id='mobile'
                    validate={{
                        required: 'This field is required',
                        pattern: {
                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                            message: 'Invalid phone number'
                        }
                    }}
                />
                <InputFrom
                    label='Address'
                    register={register}
                    errors={errors}
                    id='address'
                    validate={{
                        required: 'This field is required',
                    }}
                />
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <span className='font-medium'>Account Status:</span>
                        <span>{current?.isBlocked ? 'Blocked' : 'Active'}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='font-medium'>Role:</span>
                        <span>{+current?.role === 1945 ? 'Admin' : 'User'}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='font-medium'>Created At:</span>
                        <span>{moment(current?.createdAt).fromNow()}</span>
                    </div>
                </div>
                {isDirty && (
                    <div className='w-full flex justify-end'>
                        <Button type='submit'>Update Information</Button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default withBaseComponent(Personal);
