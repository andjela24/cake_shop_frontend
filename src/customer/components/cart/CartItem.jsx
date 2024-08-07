import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  increaseCartItemWeight,
  decreaseCartItemWeight,
} from "../../../redux/customers/cart/Action";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const CartItem = ({ item, showButton }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [updatedWeight, setUpdatedWeight] = useState(item?.selectedWeight);

  const handleRemoveItemFromCart = () => {
    dispatch(removeCartItem(item.id, jwt));
  };

  const handleWeightChange = (amount) => {
    const newWeight = updatedWeight + amount;
    if (newWeight >= 1) {
      setUpdatedWeight(newWeight);
      if (amount > 0) {
        dispatch(increaseCartItemWeight(item.id, jwt));
      } else {
        dispatch(decreaseCartItemWeight(item.id, jwt));
      }
    }
  };

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {showButton && (
            <div className="flex items-center space-x-2">
              <IconButton
                onClick={handleRemoveItemFromCart}
                color="primary"
                aria-label="remove item"
              >
                <ClearOutlinedIcon />
              </IconButton>
            </div>
          )}
          <img
            src={item?.cakeImageUrl}
            alt={item?.cakeTitle}
            className="w-20 h-20 object-cover rounded-md"
          />
        </div>

        <div className="ml-5 space-y-1 space-x-2">
          <p className="font-semibold">{item?.cakeTitle}</p>
          <p>Spratnost: {item?.selectedTiers}</p>
          <p>Težina: {item?.selectedWeight} kg</p>
          <p className="opacity-70 mt-2">{item?.note}</p>
        </div>
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={() => handleWeightChange(-1)}
            disabled={updatedWeight <= 1}
            color="primary"
            aria-label="remove one piece"
          >
            <RemoveCircleOutlineIcon />
          </IconButton>

          <span className="py-1 px-7 border rounded-sm">{updatedWeight}</span>
          <IconButton
            onClick={() => handleWeightChange(1)}
            color="primary"
            aria-label="add one piece"
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div className="flex space-x-2 items-center pt-3">
          <p className="font-semibold opacity-50">{item?.totalPrice} RSD</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
