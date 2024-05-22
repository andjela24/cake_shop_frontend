import React from "react";
import "./ProductCard.css";
import { useLocation, useNavigate } from "react-router-dom";

// {
//   "title": "Srce sa cekicem",
//   "pricePerKilo": 2200,
//   "decorationPrice": 1400,
//   "minWeight": 2,
//   "maxWeight": 30,
//   "minTier": 1,
//   "maxTier": 4,
//   "imageUrl": "https://placeimg.com/300/200/food",
//   "category": {
//       "version": null,
//       "createdAt": "2024-05-22T08:04:02.70316",
//       "updatedAt": null,
//       "deletedAt": null,
//       "createdBy": null,
//       "updatedBy": null,
//       "id": 4,
//       "name": "Specijal"
//   }
// }
const ProductCard = ({ product }) => {
  const {
    title,
    pricePerKilo,
    decorationPrice,
    minWeight,
    maxWeight,
    minTier,
    maxTier,
    imageUrl,
    category,
  } = product;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/api/cakes/${product?.id}`);
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
          alt=""
        />
      </div>
      <div className="textPart bg-white p-3 ">
        <pre>
          {JSON.stringify({
            title,
            pricePerKilo,
            decorationPrice,
            minWeight,
            maxWeight,
            minTier,
            maxTier,
            imageUrl,
            category,
          }, null, 2)}
        </pre>
        {/* <div>
          <p className="font-bold opacity-60">{brand}</p>
          <p className="">{title}</p>

          <p className="font-semibold opacity-50">{color}</p>
        </div>

        <div className="flex space-x-2 items-center">
          <p className="font-semibold">₹{discountedPrice}</p>
          <p className="opacity-50 line-through">₹{price}</p>
          <p className="text-green-600 font-semibold">{discountPersent}% off</p>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
