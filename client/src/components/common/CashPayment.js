import React, { useEffect } from "react";
import { apiCreateOrder } from "apis";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Custom component to wrap the payment button and show loading spinner
const ButtonWrapper = ({ amount, payload, setIsSuccess }) => {
    const navigate = useNavigate();

    const handleSaveOrder = async () => {
        const response = await apiCreateOrder({ ...payload, status: "Succeed" });
        if (response.success) {
            setIsSuccess(true);
            setTimeout(() => {
                Swal.fire("Congrat!", "Order was created.", "success").then(() => {
                    navigate("/");
                });
            }, 1500);
        }
    };

    const handleCashPayment = () => {
        // Simulate cash payment
        handleSaveOrder();
    };

    return (
        <div>
            <button
                className="bg-main cursor-pointer shadow-lg border w-[652px] border-gray-300 rounded-lg p-[15px] flex items-center justify-center"
                onClick={handleCashPayment}
            >
                <h2 className="text-xl font-semibold text-center text-white mx-auto">
                    Payment in cash
                </h2>
            </button>
        </div>
    );
};

export default function CashPayment({ amount, payload, setIsSuccess }) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px", margin: "auto" }}>
            <ButtonWrapper setIsSuccess={setIsSuccess} payload={payload} amount={amount} />
        </div>
    );
}
