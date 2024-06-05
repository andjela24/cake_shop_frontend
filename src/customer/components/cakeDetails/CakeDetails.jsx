import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  findCakeById,
  addItemToCart,
} from "../../../redux/customers/product/Action";
import { fetchFlavors } from "../../../redux/customers/flavor/Action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CakeDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { customersProduct } = useSelector((store) => store);
  // const { flavorReducer } = useSelector((store) => store);
  const { cakeId } = useParams();
  const cake = useSelector((store) => store.customersProduct.product);
  const flavorsList = useSelector((store) => store.flavors.flavors);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [weight, setWeight] = useState(1);
  const [fakeTier, setFakeTier] = useState(0);

  const jwt = localStorage.getItem("jwt");
  console.log("JWT U CAKE DETAILES", localStorage.getItem("jwt"));
  console.log("CAKE ID ", cakeId);

  useEffect(() => {
    if (cakeId) {
      dispatch(findCakeById(cakeId));
    }
  }, [dispatch, cakeId]);

  useEffect(() => {
    // Učitavanje ukusa kada se komponenta mount-uje
    dispatch(fetchFlavors()); // Pretpostavljamo da imate akciju fetchFlavors koja vraća ukuse sa servera
  }, [dispatch]);

  const handleSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setSelectedSize(size);
    // Initialize selected flavors with empty arrays based on size
    setSelectedFlavors(Array(size).fill(""));
  };

  const handleFakeTierChange = (e) => {
    setFakeTier(parseInt(e.target.value));
  };

  const handleFlavorChange = (tierIndex, flavorId) => {
    setSelectedFlavors((prevSelectedFlavors) => {
      const newSelectedFlavors = [...prevSelectedFlavors];
      newSelectedFlavors[tierIndex] = flavorId;
      return newSelectedFlavors;
    });
  };

  const handleSubmit = () => {
    const data = {
      // selectedWeight: weight,
      // selectedTiers: selectedSize,
      // piecesNumber: weight * 8, // assuming each kg equals 8 pieces
      // totalPrice: weight * cake.pricePerKilo,
      // cakeId: cake.id,
      // flavors: selectedFlavors.map((flavorId) => ({ id: flavorId })),
      // note: "", // assuming an empty note for now
      // fakeTier: 1, // assuming 1 fake tier for now
      selectedWeight: parseFloat(weight),
      selectedTiers: parseInt(selectedSize),
      piecesNumber: weight * 8,
      totalPrice: weight * cake.pricePerKilo + cake.decorationPrice,
      cakeId: parseInt(cake.id),
      flavors: selectedFlavors.map((flavorId) => parseInt(flavorId)),
      note: "", // Postavite vrednost ove promenljive na tekst koji korisnik unese
      fakeTier: parseInt(fakeTier),
    };
    dispatch(addItemToCart(data, jwt));
    navigate("/");
  };

  console.log("Cake", cake);

  const availableSizes = Array.from(
    { length: cake?.maxTier || 0 },
    (_, i) => i + 1
  );

  if (!cake) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white">
      <div className="pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-sm font-medium text-gray-900">
                Početna
              </a>
            </li>
            <li>
              <svg
                className="h-5 w-4 text-gray-300"
                fill="currentColor"
                viewBox="0 0 16 20"
                aria-hidden="true"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </li>
            <li>
              <a href="/cakes" className="text-sm font-medium text-gray-900">
                Svadbene torte
              </a>
            </li>
            <li>
              <svg
                className="h-5 w-4 text-gray-300"
                fill="currentColor"
                viewBox="0 0 16 20"
                aria-hidden="true"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </li>
            <li className="text-sm">
              <a
                href="#"
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {cake.title}
              </a>
            </li>
          </ol>
        </nav>

        <div className="mt-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-start">
          <div className="lg:col-span-6">
            <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
              <img
                src={cake.imageUrl}
                alt={cake.title}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 lg:col-span-6">
            <h1 className="text-2xl font-bold text-gray-900">{cake.title}</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="mt-3">
                <h2 className="text-l font-semibold text-gray-900">
                  Cena / kg
                </h2>
                <p className="text-gray-900">{cake.pricePerKilo} RSD</p>
              </div>

              <div className="mt-3">
                <h2 className="text-l font-semibold text-gray-900">
                  Cena ukrašavanja
                </h2>
                <p className="text-gray-900">{cake.decorationPrice} RSD</p>
              </div>

              <div className="mt-3">
                <h2 className="text-l font-semibold text-gray-900">Ukusi</h2>
                <p className="text-gray-900">Vi birate</p>
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700"
              >
                Odaberite veličinu
              </label>
              <select
                id="size"
                name="size"
                value={selectedSize}
                onChange={handleSizeChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Odaberite veličinu</option>
                {availableSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            {/* Flavor selection */}
            <div className="mt-6">
              <label
                htmlFor="flavor"
                className="block text-sm font-medium text-gray-700"
              >
                Odaberite ukuse
              </label>
              {Array.from({ length: selectedSize }, (_, index) => (
                <div key={index} className="mt-2">
                  <label
                    htmlFor={`flavor_${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Odaberite ukus za sprat {index + 1}
                  </label>
                  <select
                    id={`flavor_${index}`}
                    name={`flavor_${index}`}
                    value={selectedFlavors[index]}
                    onChange={(e) => handleFlavorChange(index, e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Odaberite ukus</option>
                    {flavorsList.map((flavor) => (
                      <option key={flavor.id} value={flavor.id}>
                        {flavor.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <label
                htmlFor="fakeTier"
                className="block text-sm font-medium text-gray-700"
              >
                Odaberite lažni sprat
              </label>
              <select
                id="fakeTier"
                name="fakeTier"
                value={fakeTier}
                onChange={(e) => setFakeTier(parseInt(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="0">Bez laznog sprata</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="mt-6">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
              >
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
              <div className="grid grid-cols-2 gap-4 mt-2">
                <p className="text-lg font-medium text-gray-900">
                  Težina torte: {weight} kg
                </p>
                <p className="text-lg font-medium text-gray-900">
                  Broj parčića: {weight * 8}
                </p>
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
}
