import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { findCakeById } from "../../../redux/customers/product/Action";
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CakeDetails() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const { cakeId } = useParams();
  const cake = useSelector((store) => store.customersProduct.product); // Pretpostavljam da u stanju imate proizvod pod ovim ključem

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [weight, setWeight] = useState(1);

  const jwt = localStorage.getItem("jwt");

  //   const handleSubmit = () => {
  //     const data = { productId, size: selectedSize.name };
  //     dispatch(addItemToCart({ data, jwt }));
  //     navigate("/cart");
  //   };

  const handleSubmit = () => {
    // const data = { productId: cakeId, size: selectedSize, weight };
    // dispatch(addItemToCart({ data, jwt }));
    const data = {
      selectedWeight: weight,
      selectedTiers: selectedSize,
      piecesNumber: weight * 8, // assuming each kg equals 8 pieces
      totalPrice: weight * cake.pricePerKilo,
      cakeId: cake.id,
      flavors: [{ id: selectedFlavor }],
      note: "", // assuming an empty note for now
      fakeTier: 1 // assuming 1 fake tier for now
    };
    dispatch(findCakeById(cakeId));
    navigate("/cart");
  };

  useEffect(() => {
    dispatch(findCakeById(cakeId));
  }, [cakeId]);

  console.log("Cake", cake);
  const availableSizes = [1, 2, 3, 4]; // replace with real sizes
  const availableFlavors = [{ id: 1, name: "Chocolate" }, { id: 2, name: "Vanilla" }]; // replace with real flavors


  if (!cake) {
    return <div>Loading...</div>;
  }
  return(
    <div className="bg-white">
      <div className="pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-sm font-medium text-gray-900">Početna</a>
            </li>
            <li>
              <svg className="h-5 w-4 text-gray-300" fill="currentColor" viewBox="0 0 16 20" aria-hidden="true">
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </li>
            <li>
              <a href="/cakes" className="text-sm font-medium text-gray-900">Svadbene torte</a>
            </li>
            <li>
              <svg className="h-5 w-4 text-gray-300" fill="currentColor" viewBox="0 0 16 20" aria-hidden="true">
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </li>
            <li className="text-sm">
              <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {cake.title}
              </a>
            </li>
          </ol>
        </nav>

        <div className="mt-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-start">
          <div className="lg:col-span-6">
            <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
              <img src={cake.imageUrl} alt={cake.title} className="w-full h-full object-center object-cover" />
            </div>
          </div>

          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 lg:col-span-6">
            <h1 className="text-2xl font-bold text-gray-900">{cake.title}</h1>

            <div className="mt-3">
              <h2 className="text-xl font-semibold text-gray-900">Cena / kg</h2>
              <p className="text-3xl text-gray-900">{cake.pricePerKilo} RSD</p>
            </div>

            <div className="mt-3">
              <h2 className="text-xl font-semibold text-gray-900">Cena ukrašavanja</h2>
              <p className="text-gray-900">{cake.decorationPrice} RSD</p>
            </div>

            <div className="mt-3">
              <h2 className="text-xl font-semibold text-gray-900">Ukusi</h2>
              <p className="text-gray-900">Vi birate</p>
            </div>

            <div className="mt-6">
              <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                Odaberite veličinu
              </label>
              <select
                id="size"
                name="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Odaberite veličinu</option>
                {availableSizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <label htmlFor="flavor" className="block text-sm font-medium text-gray-700">
                Odaberite ukus za 1 sprat
              </label>
              <select
                id="flavor"
                name="flavor"
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Odaberite ukus za 1 sprat</option>
                {availableFlavors.map((flavor) => (
                  <option key={flavor.id} value={flavor.id}>{flavor.name}</option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                Težina torte:
              </label>
              <input
                id="weight"
                name="weight"
                type="range"
                min={cake.minWeight}
                max={cake.maxWeight}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Min: {cake.minWeight}kg</span>
                <span>Maks: {cake.maxWeight}kg</span>
              </div>
              <div className="mt-2">
                <p className="text-lg font-medium text-gray-900">Težina torte: {weight} kg</p>
                <p className="text-lg font-medium text-gray-900">Broj parčića: {weight * 8}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-red-600 border border-transparent rounded-md py-3 px-8 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Dodaj u korpu
              </button>
            </div>
            <div className="mt-6">
              <p className="text-base font-medium text-gray-900">
                Cena {weight * cake.pricePerKilo + cake.decorationPrice} RSD
              </p>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                Ili pozovite 013 2521 545 / 064 267 72 76
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // return(<div>
  //   <h1>Detalji Torte</h1>
  //   {cake ? (
  //     <pre>{JSON.stringify(cake, null, 2)}</pre>
  //   ) : (
  //     <p>Učitavanje...</p>
  //   )}
  // </div>
  // );
}