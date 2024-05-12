import { current } from "@reduxjs/toolkit";
import { Breadcrumd, Button } from "components";
import OrderItem from "components/products/OrderItem";
import withBaseComponent from "hocs/withBaseComponent";
import { useSelector } from "react-redux";
import { Link, createSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { formatMoney } from "utils/helpers";
import path from "utils/path";

const DetailCart = ({ location, navigate }) => {
    const { currentCart, current } = useSelector(state => state.user)

    console.log(location.pathname)
    const handleSubmit = () => {
        if (!current?.address) return Swal.fire({
            icon: 'info',
            title: 'Almost!',
            text: 'Please update your address before checkout',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Go update',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate({
                    pathname: `/${path.MEMBER}/${path.PERSONAL}`,
                    search: createSearchParams({ redirect: location.pathname }).toString(),
                });
            }
        });
        else window.open(`/${path.CHECKOUT}`, '_self')
    }
    console.log(currentCart)
    return (
        <div className="w-full relative px-4">
            <div className="flex flex-col border my-8 w-full mx-auto rounded-md bg-white ">
                <div className="w-full mx-auto border-b font-semibold py-3 grid grid-cols-10 uppercase">
                    <span className="col-span-6 w-full text-center">Products</span>
                    <span className="col-span-1 w-full text-center">Quantity</span>
                    <span className="col-span-3 w-full text-center">Price</span>
                </div>
                {currentCart.map(el => (
                    <OrderItem
                        key={el._id}
                        dfQuantity={el.quantity}
                        color={el.color}
                        title={el.title}
                        thumbnail={el.thumbnail}
                        price={el.price}
                        pid={el.product?._id}
                    />
                ))}
                <div className="w-main mx-auto flex flex-col justify-center mt-3 mb-3 items-end gap-3">
                    <span className="flex items-center gap-8 text-sm">
                        <span>Subtotal:</span>
                        <span className="text-lg font-bold">{formatMoney(currentCart.reduce((sum, el) => sum + Number(el?.price) * el.quantity, 0)) + ' VND'}</span>
                    </span>
                    <span className="text-xs italic">Shipping, taxes, and discounts calculated at checkout</span>
                    <Button handleOnClick={handleSubmit}>Checkout </Button>
                </div>
            </div>
        </div>

    )
}

export default withBaseComponent(DetailCart)