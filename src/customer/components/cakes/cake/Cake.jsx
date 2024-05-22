import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { findAllCakes } from "../../../../redux/customers/product/Action";
import CakeCard from "../cakeCard/CakeCard";

export default function Cake() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const param = useParams();
  const cakes = useSelector((store) => store.customersProduct.products);

  useEffect(() => {
    dispatch(findAllCakes());
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Torte</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {cakes?.map((item) => (
            <CakeCard cake={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
