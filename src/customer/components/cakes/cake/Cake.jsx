import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  findAllCakes,
  findCakesByCategory,
} from "../../../../redux/customers/product/Action";
import CakeCard from "../cakeCard/CakeCard";

export default function Cake() {
  const didMountRef = useRef(false);
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const jwt = localStorage.getItem("jwt");
  const cakes = useSelector((store) => store.customersProduct.products);
  const areCakesLoading = useSelector(
    (store) => store.customersProduct.cakesCategoryLoading
  );

  // const setCategory = (category) => {
  //   didMountRef.current = false;
  //   setParams({ category });
  // };

  // useEffect(() => {
  //   if (didMountRef.current) {
  //     return;
  //   }

  //   const category = params.get("category");
  //   didMountRef.current = true;
  //   if (!areCakesLoading) {
  //     dispatch(findCakesByCategory({ category }));
  //   }
  // }, [params, dispatch, areCakesLoading]);

  useEffect(() => {
    const category = params.get("category");
    dispatch(findCakesByCategory({ category }));
  }, [params, dispatch]);

  console.log(cakes);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Torte
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {cakes?.map((item) => (
            <CakeCard key={item.id} cake={item} />
          ))}
          {/* {cakes?.map((item, index) => (
            <CakeCard key={index} cake={item} />
          ))} */}
        </div>
      </div>
    </div>
  );
}
