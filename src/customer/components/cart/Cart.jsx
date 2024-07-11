import React from "react";
import CartItem from "./CartItem";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../../redux/customers/cart/Action";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const cart = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getCart(jwt));
  }, [jwt]);

  if (!jwt) {
    return (
      <Box
        textAlign="center"
        mt={4}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          <img
            src="https://img.freepik.com/free-vector/my-password-concept-illustration_114360-4294.jpg?t=st=1720693046~exp=1720696646~hmac=61b778ec1c3b12b5e616bb86379d740e2ea7af72d2675a3565290b77114411df&w=826"
            alt="Login illustration"
            className="object-cover object-center h-3/6"
          />
        <Typography variant="h6">
          Prijavite se da bi videli svoju korpu.
        </Typography>
      </Box>
    );
  }

  if (cart.cartItems.length === 0) {
    return (
      <Box textAlign="center" mt={4}  sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <img
            src="https://img.freepik.com/free-vector/empty-shopping-basket-concept-illustration_114360-17072.jpg?t=st=1720694255~exp=1720697855~hmac=e910d23a37492fa3d82fdb85dbe86744a21b13548214ea03178b78aa3053369c&w=826"
            alt="Cart illustration"
            className="object-cover object-center h-3/6"
          />
        <Typography variant="h6">Nemate proizvoda u korpi</Typography>
      </Box>
    );
  }
  return (
    <div className="pt-6 mt-4">
      {cart.cartItems.length > 0 && (
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          <div className="lg:col-span-2 lg:px-5 bg-white">
            <div className="space-y-3">
              {console.log(cart.cartItems)}
              {cart.cartItems.map((item) => (
                <CartItem item={item} showButton={true} />
              ))}
            </div>
          </div>
          <div className="px-5 sticky top-0 mt-5 lg:mt-0 ">
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="font-bold opacity-60 pb-4">UKUPNA VREDNOST KORPE</p>
              <hr />

              <div className="space-y-3 font-semibold">
                <div className="flex justify-between">
                  <span>Dostava</span>
                  <span className="text-green-700">Besplatna</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Ukupna cena</span>
                  <span className="text-green-700">
                    {cart.cart?.totalPrice} RSD
                  </span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/checkout?step=2")}
                variant="contained"
                type="submit"
                sx={{
                  padding: ".8rem 2rem",
                  marginTop: "2rem",
                  width: "100%",
                  background: "#132743",
                }}
              >
                Plaćanje
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
