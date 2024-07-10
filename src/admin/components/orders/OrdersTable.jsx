import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  shipOrder,
  getAllOrders,
} from "../../../redux/admin/orders/Action";

const OrdersTable = () => {
  const [formData, setFormData] = useState({ status: "", sort: "" });
  const [setOrderStatus] = useState("");
  const dispatch = useDispatch();
  const { adminsOrder } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  function handlePaginationChange(event, value) {
    console.log("Current page:", value);
  }

  const handleConfirmedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(confirmOrder(orderId));
    setOrderStatus("CONFIRMED");
  };

  const handleShippedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(shipOrder(orderId));
    setOrderStatus("ShIPPED");
  };

  const handleDeliveredOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(deliveredOrder(orderId));
    setOrderStatus("DELIVERED");
  };

  const handleDeleteOrder = (orderId) => {
    handleUpdateStatusMenuClose();
    dispatch(deleteOrder(orderId));
  };

  return (
    <Box>
      <Card className="mt-2">
        <CardHeader
          title="Sve porudžbine"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Broj porudžbine</TableCell>
                <TableCell>Datum porudžbine</TableCell>
                <TableCell>Datum dostave</TableCell>
                <TableCell>Plaćeno</TableCell>
                <TableCell>Broj proizvoda</TableCell>
                <TableCell>Ukupna cena</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Izmeni</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Obriši</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminsOrder?.orders?.map((item, index) => (
                <TableRow
                  hover
                  key={item.id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.orderNumber}</TableCell>
                  <TableCell>{item.orderDate}</TableCell>
                  <TableCell>{item.deliveryDate}</TableCell>
                  <TableCell>{item.paid ? "Da" : "Ne"}</TableCell>
                  <TableCell>{item.totalItem}</TableCell>
                  <TableCell>{item.totalPrice} RSD</TableCell>
                  <TableCell className="text-white">
                    <Chip
                      sx={{
                        color: "grey !important",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      label={item.orderStatus}
                      size="small"
                      color={
                        item.orderStatus === "PENDING"
                          ? "info"
                          : item.orderStatus === "DELIVERED"
                          ? "success"
                          : "secondary"
                      }
                      className="text-white"
                    />
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center" }}
                    className="text-white"
                  >
                    <div>
                      <Button
                        id={`basic-button-${item.id}`}
                        aria-controls={`basic-menu-${item.id}`}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorElArray[index])}
                        onClick={(event) =>
                          handleUpdateStatusMenuClick(event, index)
                        }
                      >
                        Izmeni status
                      </Button>
                      <Menu
                        id={`basic-menu-${item.id}`}
                        anchorEl={anchorElArray[index]}
                        open={Boolean(anchorElArray[index])}
                        onClose={() => handleUpdateStatusMenuClose(index)}
                        MenuListProps={{
                          "aria-labelledby": `basic-button-${item.id}`,
                        }}
                      >
                        <MenuItem
                          onClick={() => handleConfirmedOrder(item.id, index)}
                          disabled={
                            item.orderStatus === "DELEVERED" ||
                            item.orderStatus === "SHIPPED" ||
                            item.orderStatus === "CONFIRMED"
                          }
                        >
                          CONFIRMED ORDER
                        </MenuItem>
                        <MenuItem
                          disabled={
                            item.orderStatus === "DELIVERED" ||
                            item.orderStatus === "SHIPPED"
                          }
                          onClick={() => handleShippedOrder(item.id, index)}
                        >
                          SHIPPED ORDER
                        </MenuItem>
                        <MenuItem onClick={() => handleDeliveredOrder(item.id)}>
                          DELIVERED ORDER
                        </MenuItem>
                      </Menu>
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center" }}
                    className="text-white"
                  >
                    <Button
                      onClick={() => handleDeleteOrder(item.id)}
                      variant="text"
                    >
                      Obriši
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 felx justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={10}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Card>
    </Box>
  );
};

export default OrdersTable;
