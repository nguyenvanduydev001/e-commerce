import React, { useEffect, useState } from "react";
import payment from 'assets/payment.svg'
import { useSelector } from "react-redux";
import { formatMoney } from "utils/helpers";
import { Congrat, InputFrom, Paypal } from "components";
import { useForm } from "react-hook-form";
import withBaseComponent from "hocs/withBaseComponent";
import { getCurrent } from "store/user/asyncActions";

const Checkout = ({ dispatch }) => {
    const { currentCart, current } = useSelector(state => state.user)
    const filteredCart = currentCart.filter(el => el.product !== null);
    // const currents = current?.filter(el => el?.product !== null);
    const { register, formState: { errors }, watch, setValue } = useForm()
    const [isSuccess, setIsSuccess] = useState(false)
    const address = watch('address')
    useEffect(() => {
        console.log(current.address)
        setValue('address', current?.address)
    }, [current.address])
    useEffect(() => {
        if (isSuccess) dispatch(getCurrent())
    }, [isSuccess])

    return (
        <div className="p-8 w-full grid grid-cols-10 gap-6 h-full max-h-screen overflow-y-auto">

            {isSuccess && <Congrat />}
            <div className="w-full flex justify-center items-center col-span-4">
                <img src={payment} alt="payment" className="h-[70%] object-contain" />
            </div>
            <div className="flex w-full flex-col justify-center  col-span-6 gap-6">
                <h2 className="text-3xl mb-6 font-bold">Checkout your order</h2>
                <div className="flex w-full gap-6">
                    <table className="table-auto flex-1">
                        <thead>
                            <tr className="border bg-gray-200">
                                <th className="text-left p-2 ">Product</th>
                                <th className="text-center p-2 ">Quantity</th>
                                <th className="text-right p-2 ">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCart?.map(el => (<tr className="border" key={el._id}>
                                <td className="textleft p-2">{el.title}</td>
                                <td className="text-center p-2">{el.quantity}</td>
                                <td className="text-right p-2">{formatMoney(el.price) + ' VND'}</td>
                            </tr>))}
                        </tbody>
                    </table>
                    <div className="flex-1 flex flex-col justify-between gap-[45px]">
                        <div className="flex flex-col gap-6">
                            <span className="flex items-center gap-8 text-sm">
                                <span className="font-medium">Subtotal:</span>
                                <span className="text-main font-bold">{formatMoney(filteredCart.reduce((sum, el) => sum + Number(el?.price) * el.quantity, 0)) + ' VND'}</span>
                            </span>
                            <div>
                                <InputFrom
                                    label='Your address'
                                    register={register}
                                    errors={errors}
                                    id='address'
                                    validate={{
                                        required: 'Need fill this field'
                                    }}
                                    placeholder='Please fill the address first'
                                    style='text-sm'
                                />
                            </div>
                        </div>
                        <div className="w-full mx-auto">
                            <Paypal
                                payload={{
                                    products: filteredCart,
                                    total: Math.round(+filteredCart.reduce((sum, el) => sum + Number(el?.price) * el.quantity, 0) / 23500),
                                    address
                                }}
                                setIsSuccess={setIsSuccess}
                                amount={Math.round(+filteredCart.reduce((sum, el) => sum + Number(el?.price) * el.quantity, 0) / 23500)}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default withBaseComponent(Checkout)