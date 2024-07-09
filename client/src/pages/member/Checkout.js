import React, { useEffect, useState } from "react";
import payment from "assets/payment.svg";
import { useSelector } from "react-redux";
import { formatMoney } from "utils/helpers";
import { Congrat, InputFrom, Paypal } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import { getCurrent } from "store/user/asyncActions";
import { Helmet } from "react-helmet";
import { FaOpencart } from "react-icons/fa";

const Checkout = ({ dispatch }) => {
  const { currentCart, current } = useSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) dispatch(getCurrent());
  }, [isSuccess]);
  console.log(currentCart);

  return (
    <div className="p-8 w-full  gap-6 h-full max-h-screen overflow-y-auto  bg-gray-100">
      {isSuccess && <Congrat />}
      <Helmet>
        <title>Checkout - Digital World</title>
      </Helmet>
      <div className="flex w-full flex-col justify-center gap-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-3xl mb-6 font-bold text-gray-800 px-6 py-4 flex  bg-white border-b">
          Checkout your order <FaOpencart className="ml-[74%]" />{" "}
        </h2>
        <div className="flex w-full gap-6">
          <div className="flex-[50%]">
            <table className="table-auto min-w-full ml-[27px] bg-white border rounded shadow-md">
              <thead>
                <tr className="border bg-white ">
                  <th className="text-left p-2 ">Product</th>
                  <th className="text-center p-2 ">Quantity</th>
                  <th className="text-right p-2 ">Price</th>
                </tr>
              </thead>
              <tbody>
                {currentCart?.map((el) => (
                  <tr className="border" key={el._id}>
                    <td className="flex p-2">
                      <img
                        src={el.thumbnail}
                        alt="thumb"
                        className="w-12 h-12 rounded-none object-cover"
                      />
                      <span className="mt-[8px] ml-[12px]">{el.title}</span>
                    </td>
                    <td className="text-center p-2">{el.quantity}</td>
                    <td className="text-right p-2">
                      {formatMoney(el.price) + " VND"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex-[50%]  flex flex-col justify-between gap-[8px]">
            <div className="flex ml-[33px] flex-col gap-3">
              <span className="flex items-center gap-8 text-sm">
                <span className="text-2xl">Total:</span>
                <span className=" text-2xl font-semibold">
                  {formatMoney(
                    currentCart.reduce(
                      (sum, el) => sum + Number(el?.price) * el.quantity,
                      0
                    )
                  ) + " VND"}
                </span>
              </span>
              <span className="flex items-center gap-8 text-sm">
                <span className="font-[15px]">Address:</span>
                <span className=" font-semibold">{current?.address}</span>
              </span>
              <div class="flex items-center justify-center p-[10px] bg-white shadow-lg border border-gray-300 rounded-lg mx-auto">
                <h1 class="text-[21px] font-medium text-blue-500 text-center">
                  Select a payment method
                </h1>
              </div>
              <div
                className="bg-main ursor-pointer shadow-lg border w-[652px] border-gray-300 rounded-lg p-[15px] flex items-center justify-center"
                onClick={() => {
                  alert("The method is currently under maintenance");
                }}
              >
                <h2 className="text-xl font-semibold text-center text-white mx-auto">
                  Payment in cash
                </h2>
              </div>
            </div>
            <h1 className="w-[652px] flex items-center justify-center text-[21px] font-medium ml-6">
              Or
            </h1>
            <div className="w-[652px] mx-auto">
              <Paypal
                payload={{
                  products: currentCart,
                  total: Math.round(
                    +currentCart.reduce(
                      (sum, el) => sum + Number(el?.price) * el.quantity,
                      0
                    ) / 23500
                  ),
                  address: current?.address,
                }}
                setIsSuccess={setIsSuccess}
                amount={Math.round(
                  +currentCart.reduce(
                    (sum, el) => sum + Number(el?.price) * el.quantity,
                    0
                  ) / 23500
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(Checkout);
