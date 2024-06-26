import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { confirmPaymentSuccess } from "../../../redux/customers/payment/Action";
import OrderTracker from "../orders/OrderTracker";
import AddressCard from "../address/AddressCard";
import { Alert, AlertTitle, Grid } from "@mui/material";

const PaymentSuccess = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((store) => store.order.order);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get("paymentId");
    const payerId = urlParams.get("PayerID");

    const storedOrderId = localStorage.getItem("orderId");

    if (paymentId && payerId) {
      // Pozivamo akciju confirmPaymentSuccess kako bi ažurirali stanje porudžbine
      dispatch(confirmPaymentSuccess(paymentId, payerId, storedOrderId));
    }
  }, [dispatch]);

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

      {order && (
        <Grid container className="space-y-5 py-5 pt-20">
          {order.orderItems.map((item) => (
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
                    src={item.cake.imageUrl}
                    alt={item.cake.title}
                  />
                  <div className="ml-5 space-y-2">
                    <p>{item.cake.title}</p>
                    <p className="opacity-50 text-xs font-semibold space-x-5">
                      <span>Veličina: {item.selectedWeight} kg</span>
                      <span>Nivoi: {item.selectedTiers}</span>
                      <span>Količina: {item.piecesNumber} kom</span>
                    </p>
                    <p>Ukupna cena: {item.totalPrice} RSD</p>
                  </div>
                </div>
              </Grid>
              <Grid item>
                <AddressCard address={order.shippingAddress} />
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PaymentSuccess;
