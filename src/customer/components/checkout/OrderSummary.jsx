import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../redux/customers/order/Action";
import AddressCard from "../address/AddressCard";
import { createPayment } from "../../../redux/customers/payment/Action";
import OrderItem from "../orders/OrderItem";

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("id");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const order = useSelector((state) => state.order.order);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const handleCreatePayment = () => {
    const data = { orderId: order?.id, jwt };
    dispatch(createPayment(data));
  };

  return (
    <div className="lg:px-16 space-y-5">
      <div className="p-5 shadow-lg rounded-md border">
        {order?.shippingAddress && (
          <AddressCard address={order.shippingAddress} />
        )}
      </div>
      <div className="lg:grid grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="space-y-3">
            {order?.orderItems?.map((item) => (
              <OrderItem key={item.id} item={item} showButton={false} />
            ))}
          </div>
        </div>
        <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">UKUPNA VREDNOST KORPE</p>
            <hr />
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>
                  Cena ({order?.totalItem}{" "}
                  {order?.totalItem === 1 ? "proizvod" : "proizvoda"})
                </span>
                <span>{order?.totalPrice} RSD</span>
              </div>
              <div className="flex justify-between">
                <span>Dostava</span>
                <span className="text-green-700">Besplatna</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Ukupna cena</span>
                <span className="text-green-700">{order?.totalPrice} RSD</span>
              </div>
            </div>

            <Button
              onClick={handleCreatePayment}
              variant="contained"
              type="submit"
              sx={{
                padding: ".8rem 2rem",
                marginTop: "2rem",
                width: "100%",
              }}
            >
              PLAćANJE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
