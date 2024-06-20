import * as React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../redux/customers/order/Action";
import AddressCard from "../address/AddressCard";
import { useState, useEffect } from "react";

export default function AddDeliveryAddressForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, cart } = useSelector((store) => store);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    console.log("Auth state in AddDeliveryAddressForm: ", auth);
    if (auth.user) {
      console.log("Setting user details from auth.user");
      setUserDetails({
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
        phoneNumber: auth.user.phoneNumber,
        email: auth.user.email,
      });
    } else {
      console.log("auth.user is undefined in AddDeliveryAddressForm");
    }
  }, [auth.user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const address = {
      streetAddress: data.get("address"),
      city: data.get("city"),
      zipCode: data.get("zip"),
    };

    const orderData = {
      address,
      jwt,
      navigate,
      userId: auth.user?.id,
      cartItems: cart.cart.cartItems.map((item) => item.id),
      deliveryDate: new Date().toISOString(),
      totalPrice: cart.cart.totalPrice || 0,
      totalDiscountedPrice: cart.cart.totalDiscountedPrice || 0,
      discount: cart.cart.discount || 0,
      orderDate: new Date().toISOString(),
      orderStatus: "Pending",
      totalItem: cart.cart.totalItem || 0,
    };
    console.log("Order data", orderData);
    dispatch(createOrder(orderData));
    handleNext();
  };

  useEffect(() => {
    console.log("Cart data", cart);
  }, [cart]);

  const handleCreateOrder = (item) => {
    const orderData = {
      address: item,
      jwt,
      navigate,
      userId: auth.user?.id,
      cartItems: cart.cartItems.map((item) => item.id),
      deliveryDate: new Date().toISOString(),
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      discount: cart.discount,
      orderDate: new Date().toISOString(),
      orderStatus: "Pending",
      totalItem: cart.totalItem,
    };

    dispatch(createOrder(orderData));
    handleNext();
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={5}>
        <Box className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll ">
          {auth.user?.addresses?.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAddress(item)}
              className="p-5 py-7 border-b cursor-pointer"
            >
              <AddressCard address={item} />
              {selectedAddress?.id === item.id && (
                <Button
                  sx={{ mt: 2 }}
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => handleCreateOrder(item)}
                >
                  Potvrdi
                </Button>
              )}
            </div>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} lg={7}>
        <Box className="border rounded-md shadow-md p-5">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="Ime"
                  fullWidth
                  autoComplete="given-name"
                  value={userDetails.firstName}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      firstName: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Prezime"
                  fullWidth
                  autoComplete="family-name"
                  value={userDetails.lastName}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, lastName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Broj telefona"
                  fullWidth
                  autoComplete="tel"
                  value={userDetails.phoneNumber}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="E-mail"
                  fullWidth
                  autoComplete="email"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Adresa"
                  fullWidth
                  autoComplete="shipping address"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="Grad"
                  fullWidth
                  autoComplete="shipping address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Poštanski broj"
                  fullWidth
                  autoComplete="shipping postal-code"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ padding: ".9rem 1.5rem" }}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Potvrdi
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
