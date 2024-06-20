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

const OrderItem = ({ item, showButton }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
//   const [updatedWeight, setUpdatedWeight] = useState(item.selectedWeight);

//   const handleRemoveItemFromCart = () => {
//     dispatch(removeCartItem(item.id, jwt)); // Poziv akcije za uklanjanje stavke iz korpe
//   };

//   const handleWeightChange = (amount) => {
//     const newWeight = updatedWeight + amount;
//     if (newWeight >= 1) {
//       setUpdatedWeight(newWeight);
//       if (amount > 0) {
//         dispatch(increaseCartItemWeight(item.id, jwt)); // Poziv akcije za povećanje težine
//       } else {
//         dispatch(decreaseCartItemWeight(item.id, jwt)); // Poziv akcije za smanjenje težine
//       }
//     }
//   };

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={item?.cake.imageUrl}
            alt={item?.cake.title}
            className="w-20 h-20 object-cover rounded-md"
          />
        </div>

        <div className="ml-5 space-y-1 space-x-2">
          <p className="font-semibold">{item?.cake.title}</p>
          <p>Spratnost: {item?.selectedTiers}</p>
          <p>Težina: {item?.selectedWeight} kg</p>
          <p className="opacity-70 mt-2">{item?.note}</p>
        </div>
        <div className="flex space-x-2 items-center pt-3">
          <p className="font-semibold opacity-50">{item?.totalPrice} RSD</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
