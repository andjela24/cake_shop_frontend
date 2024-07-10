import { Box, Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();
  return (
    <Box className="p-5 shadow-lg hover:shadow-2xl border ">
      <Grid
        spacing={2}
        container
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Grid item xs={3}>
          <div
            onClick={() => navigate(`/account/order/${order?.id}`)}
            className="flex cursor-pointer"
          >
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={item?.cake.imageUrl}
              alt=""
            />
            <div className="ml-5">
              <p className="mb-2">{item?.cake.title}</p>
              <p className="opacity-50 text-xs font-semibold space-x-5">
                <span>Broj porudžbine: {order?.orderNumber}</span>
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <p>Način plaćanja: {order?.paymentMethod}</p>
        </Grid>
        <Grid item xs={3}>
          <p>Ukupna cena: {item?.totalPrice} RSD</p>
        </Grid>
        <Grid item xs={3}>
          <p className="space-y-2 font-semibold">
            {order?.orderStatus === "DELIVERED" ? (
              <>
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Dostavljeno {order.deliveryDate}</span>
              </>
            ) : (
              <>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Očekuje se dostava {order.deliveryDate}</span>
              </>
            )}
          </p>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;
