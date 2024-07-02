import React from "react";
import { useNavigate } from "react-router-dom";
import "./CakeCard.css";

export default function CakeCard({ cake }) {
  const {
    title,
    pricePerKilo,
    category,
    imageUrl,
  } = cake;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/cakes/${cake?.id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="cakeCard border transition-all cursor-pointer overflow-hidden"
      style={{ maxWidth: "15rem" }}
    >
      <div className="h-[20rem]">
        <img
          className="h-full w-100 object-cover"
          src={imageUrl}
          alt="cake"
        />
      </div>
      <div className="textPart bg-white p-3">
        <div>
          <p className="font-bold opacity-60">{pricePerKilo} RSD/kg</p>
          <p className="">{title}</p>
          <p className="font-semibold opacity-50">{category.name}</p>
        </div>
      </div>
    </div>
  );
}
