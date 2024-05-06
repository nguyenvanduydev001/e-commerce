import React, { useState, useEffect, useCallback, memo } from "react";
import icons from "utils/icons";
import { apiGetProducts } from "apis/product";
import { renderStartFromNumber, formatMoney, secondsToHms } from "utils/helpers";
import { Countdown } from "../";
import moment from "moment";
import { useSelector } from "react-redux";
import withBaseComponent from "hocs/withBaseComponent";
import { getDealDaily } from "store/products/productSlice";

const { AiFillStar, AiOutlineMenu } = icons;

const DealDaily = ({ dispatch }) => {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expireTime, setExpireTime] = useState(false);
    const { dealDaily } = useSelector((s) => s.products);

    const fetchRandomProduct = async () => {
        const response = await apiGetProducts({ sort: "-totalRatings", limit: 20 });
        return response.products[Math.round(Math.random() * 20)];
    };



    const updateDealDaily = async (product) => {
        dispatch(getDealDaily({ data: product, time: Date.now() + 24 * 60 * 60 * 1000 }));
    };
    const fetchDealDaily = useCallback(async () => {
        const product = await fetchRandomProduct();
        updateDealDaily(product);
    }, [dispatch]);

    useEffect(() => {
        if (dealDaily?.time) {
            const deltaTime = dealDaily.time - Date.now();
            const { h, m, s } = secondsToHms(deltaTime);
            setHour(h);
            setMinute(m);
            setSecond(s);
        }
    }, [dealDaily]);

    useEffect(() => {
        // if (moment(dealDaily?.time).isBefore(moment())) 
        fetchDealDaily();
        //}
    }, [expireTime, fetchDealDaily]);

    useEffect(() => {
        let idInterval;
        idInterval = setInterval(() => {
            if (second > 0) {
                setSecond((prev) => prev - 1);
            } else {
                if (minute > 0) {
                    setMinute((prev) => prev - 1);
                    setSecond(59);
                } else {
                    if (hour > 0) {
                        setHour((prev) => prev - 1);
                        setMinute(59);
                        setSecond(59);
                    } else {
                        setExpireTime(!expireTime);
                    }
                }
            }
        }, 1000);
        return () => {
            clearInterval(idInterval);
        };
    }, [second, minute, hour, expireTime]);

    return (
        <div className="border w-full flex-auto">
            <div className="flex items-center justify-between p-4 w-full">
                <span className="flex-1 flex justify-center"><AiFillStar size={20} color='#DD1111' /></span>
                <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-700">DealDaily</span>
                <span className="flex-1"></span>
            </div>
            <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
                <img
                    src={dealDaily?.data?.thumb || 'https://3qleather.com/wp-content/themes/olympusinn/assets/images/default-placeholder.png'}// cái deal dalily là thời gian mà đâu có hình ảnh gì đâu mà bỏ vô
                    alt=""
                    className="w-full object-contain"
                />
                <span className="line-clamp-1 text-center">{dealDaily?.data?.title}</span>
                <span className="flex h-4">{renderStartFromNumber(dealDaily?.data?.totalRatings, 20)?.map((el, index) => (
                    <span key={index}>{el}</span>
                ))}</span>
                <span>{`${formatMoney(dealDaily?.data?.price)} VNĐ`}</span>
            </div>
            <div className="px-4 mt-8">
                <div className="flex justify-center gap-2 items-center mb-4">
                    <Countdown unit={'Hours'} number={hour} />
                    <Countdown unit={'Minutes'} number={minute} />
                    <Countdown unit={'Seconds'} number={second} />
                </div>
                <button
                    type="button"
                    className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
                >
                    <AiOutlineMenu />
                    <span>Options</span>
                </button>
            </div>
        </div>
    );
};

export default withBaseComponent(memo(DealDaily));