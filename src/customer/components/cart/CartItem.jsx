import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
    removeCartItem,
    updateCartItem,
} from "../../../redux/customers/cart/Action";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CartItem = ({ item, showButton }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleRemoveItemFromCart = () => {
        const data = { cartItemId: item?.id, jwt };
        dispatch(removeCartItem(data));
    };

    const handleUpdateCartItem = (num) => {
        const data = {
            data: { piecesNumber: item.piecesNumber + num },
            cartItemId: item?.id,
            jwt,
        };
        dispatch(updateCartItem(data));
    };

    // Funkcija za prikaz ukusa u jednom redu razdvojenim zarezom
    const renderFlavors = () => {
        if (item?.flavors && item.flavors.length > 0) {
            return (
                <span>
                    {item.flavors.map((flavor, index) => (
                        <span key={index}>
                            {flavor.flavorName}
                            {index !== item.flavors.length - 1 ? ", " : ""}
                        </span>
                    ))}
                </span>
            );
        } else {
            return <p>Nema izabranih ukusa</p>;
        }
    };

    return (
        <div className="p-5 shadow-lg border rounded-md">
            <div className="flex items-center">
                <img
                    src={item?.cakeImageUrl}
                    alt={item?.cakeTitle}
                    className="w-20 h-20 object-cover rounded-md"
                />
                <div className="ml-5 space-y-1">
                    <p className="font-semibold">{item?.cakeTitle}</p>
                    <p>Broj spratova: {item?.selectedTiers}</p>
                    <p>Težina: {item?.selectedWeight} kg</p>
                    <div className="flex items-center"> {/* Novi stil za naslov i ukuse */}
                        <h3 className="mr-2">Ukusi:</h3>
                        <div className="flex">
                            {renderFlavors()}
                        </div>
                    </div>
                    <p className="opacity-70 mt-2">{item?.note}</p>
                    <div className="flex space-x-2 items-center pt-3">
                        <p className="opacity-50 line-through">
                            {item?.totalPrice} RSD
                        </p>
                    </div>
                </div>
            </div>
            {showButton && (
                <div className="lg:flex items-center lg:space-x-10 pt-4">
                    <div className="flex items-center space-x-2 ">
                        <IconButton
                            onClick={() => handleUpdateCartItem(-1)}
                            disabled={item?.piecesNumber <= 1}
                            color="primary"
                            aria-label="remove one piece"
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>

                        <span className="py-1 px-7 border rounded-sm">
                            {item?.piecesNumber}
                        </span>
                        <IconButton
                            onClick={() => handleUpdateCartItem(1)}
                            color="primary"
                            aria-label="add one piece"
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>
                    <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
                        <Button onClick={handleRemoveItemFromCart} variant="text">
                            Ukloni
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartItem;
