import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CakeCard({ cake }) {
  const {
    title,
    pricePerKilo,
    decorationPrice,
    minWeight,
    maxWeight,
    minTier,
    maxTier,
    imageUrl,
    category
  } = cake;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/api/cakes/${cake?.id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="productCard w-[15rem] border m-3 transition-all cursor-pointer "
    >
      <div className="h-[20rem]">
        <img
          className="h-full w-full object-cover object-left-top"
          src={imageUrl}
          alt="cake"
        />
      </div>
      <div className="textPart bg-white p-3 ">
        {/* <pre>
          {JSON.stringify(
            {
              title,
              pricePerKilo,
              decorationPrice,
              minWeight,
              maxWeight,
              minTier,
              maxTier,
              imageUrl,
              category,
            },
            null,
            2
          )}
        </pre> */}
        <div>
          <p className="font-bold opacity-60">{pricePerKilo} RSD/kg</p>
          <p className="">{title}</p>

          <p className="font-semibold opacity-50">{category.name}</p>
        </div>

        {/* <div className="flex space-x-2 items-center">
              <p className="font-semibold">₹{discountedPrice}</p>
              <p className="opacity-50 line-through">₹{price}</p>
              <p className="text-green-600 font-semibold">{discountPersent}% off</p>
            </div> */}
      </div>
    </div>
  );
}
