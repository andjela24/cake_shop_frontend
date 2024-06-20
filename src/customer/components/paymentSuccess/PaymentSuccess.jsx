import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../redux/customers/order/Action";
import { confirmPaymentSuccess } from "../../../redux/customers/payment/Action";
import OrderTracker from "../orders/OrderTracker";
import AddressCard from "../address/AddressCard";
import { Alert, AlertTitle, Grid } from "@mui/material";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get("paymentId");
    const payerId = urlParams.get("PayerID");

    const orderId = localStorage.getItem("orderId");

    if (paymentId && payerId) {
      // dispatch(confirmPaymentSuccess(paymentId, payerId));
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Plaćanje uspešno</AlertTitle>
          Vaša porudžbina je uspešno poslata.
        </Alert>
      </div>

      <OrderTracker activeStep={1} />

      {/* <Grid container className="space-y-5 py-5 pt-20">
        {order?.orderItems.map((item) => (
          <Grid
            key={item.id}
            container
            item
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item?.product.imageUrl}
                  alt=""
                />
                <div className="ml-5 space-y-2">
                  <p>{item.product.title}</p>
                  <p className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Color: pink</span> <span>Size: {item.size}</span>
                  </p>
                  <p>Seller: {item.product.brand}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <AddressCard address={order?.shippingAddress} />
            </Grid>
          </Grid>
        ))}
      </Grid> */}
    </div>
  );
};

export default PaymentSuccess;
