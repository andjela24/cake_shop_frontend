import { Box, Grid } from "@mui/material";
import React, { useEffect, useSyncExternalStore } from "react";
import OrderCard from "./OrderCard";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../redux/customers/order/Action";

const orderStatus = [
  { label: "U transportu", value: "onTheWay" },
  { label: "Dostavljena", value: "delevered" },
  { label: "Otkazana", value: "cancelled" },
  { label: "Vraćena", vlue: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderHistory({ jwt }));
  }, [jwt]);

  return (
    <Box className="pt-6 px-10">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5} className="">
          <div className="h-auto shadow-lg bg-white border p-5 sticky top-5">
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">Status porudžbine</h1>
              {orderStatus.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    defaultValue={option.value}
                    type="checkbox"
                    defaultChecked={option.checked}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-3 text-sm text-gray-600">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <Box className="space-y-5 ">
            {order?.orders.length > 0 &&
              order?.orders.map((order) => {
                return order?.orderItems?.map((item, index) => (
                  <OrderCard item={item} order={order} />
                ));
              })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
