import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { findCakeById } from "../../../../redux/customers/cake/Action";
import { addItemToCart } from "../../../../redux/customers/cart/Action";
import { fetchFlavors } from "../../../../redux/customers/flavor/Action";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl, InputLabel, Slider } from "@mui/material";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CakeDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cakeId } = useParams();
  const cake = useSelector((store) => store.customersCake.cake);
  const flavorsList = useSelector((store) => store.flavors.flavors);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [weight, setWeight] = useState(1);
  const [fakeTier, setFakeTier] = useState(0);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (cakeId) {
      dispatch(findCakeById(cakeId));
    }
  }, [dispatch, cakeId]);

  useEffect(() => {
    dispatch(fetchFlavors());
  }, [dispatch]);

  const handleSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setSelectedSize(size);
    setSelectedFlavors(Array(size).fill(""));
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
      selectedWeight: parseFloat(weight),
      selectedTiers: parseInt(selectedSize),
      piecesNumber: weight * 8,
      totalPrice: weight * cake.pricePerKilo + cake.decorationPrice,
      cakeId: parseInt(cake.id),
      flavors: selectedFlavors.map((flavorId) => parseInt(flavorId)),
      note: "",
      fakeTier: parseInt(fakeTier),
    };
    dispatch(addItemToCart(data, jwt));
    navigate("/");
  };

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
              <a href={`/cakes?category=${cake.category.name}`} className="text-sm font-medium text-gray-900">
              {cake.category.name}
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
              <div className="mt-3 border-2 border-[#F8E8EE] p-4 rounded-md">
                <h2 className="text-l font-semibold text-gray-900">
                  Cena / kg
                </h2>
                <p className="text-gray-900">{cake.pricePerKilo} RSD</p>
              </div>

              <div className="mt-3 border-2 border-[#F8E8EE] p-4 rounded-md">
                <h2 className="text-l font-semibold text-gray-900">
                  Cena ukrašavanja
                </h2>
                <p className="text-gray-900">{cake.decorationPrice} RSD</p>
              </div>

              <div className="mt-3 border-2 border-[#F8E8EE] p-4 rounded-md">
                <h2 className="text-l font-semibold text-gray-900">Ukusi</h2>
                <p className="text-gray-900">Vi birate</p>
              </div>
            </div>
            <div className="mt-6">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="size-label">Odaberite veličinu</InputLabel>
                <Select
                  labelId="size-label"
                  id="size"
                  name="size"
                  value={selectedSize}
                  onChange={handleSizeChange}
                  label="Odaberite veličinu"
                  className="mt-1 block w-full h-10 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <MenuItem value="">
                    <em>Odaberite veličinu</em>
                  </MenuItem>
                  {availableSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {/* Flavor selection */}
            <div className="mt-6">
              {Array.from({ length: selectedSize }, (_, index) => (
                <div key={index} className="mt-5">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id={`flavor_${index}_label`}>
                      Odaberite ukus za sprat {index + 1}
                    </InputLabel>
                    <Select
                      labelId={`flavor_${index}_label`}
                      id={`flavor_${index}`}
                      name={`flavor_${index}`}
                      value={selectedFlavors[index]}
                      onChange={(e) =>
                        handleFlavorChange(index, e.target.value)
                      }
                      label={`Odaberite ukus za sprat ${index + 1}`}
                      className="mt-1 block w-full h-10 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <MenuItem value="">
                        <em>Odaberite ukus</em>
                      </MenuItem>
                      {flavorsList.map((flavor) => (
                        <MenuItem key={flavor.id} value={flavor.id}>
                          {flavor.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="fakeTier-label">
                  Odaberite lažni sprat
                </InputLabel>
                <Select
                  labelId="fakeTier-label"
                  id="fakeTier"
                  name="fakeTier"
                  value={fakeTier}
                  onChange={(e) => setFakeTier(parseInt(e.target.value))}
                  label="Odaberite lažni sprat"
                  className="mt-1 block w-full h-10 pl-3 pr-10 py-2 text-base border-gray-300 focus
                  focus
                  focus
                  sm
                  rounded-md"
                >
                  <MenuItem value="0">Bez lažnog sprata</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mt-6">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
              >
                Težina torte:
              </label>
              <Slider
                id="weight"
                name="weight"
                min={cake.minWeight}
                max={cake.maxWeight}
                value={weight}
                onChange={(e, newValue) => setWeight(newValue)}
                valueLabelDisplay="auto"
                marks={[
                  { value: cake.minWeight, label: cake.minWeight  + "kg" },
                  { value: cake.maxWeight, label: cake.maxWeight + "kg" },
                ]}
              />
              <div className="grid grid-cols-2 gap-4 mt-2">
                <p className="text-lg font-medium text-gray-900 border-2 border-[#F8E8EE] p-4 rounded-md">
                  Težina torte: {weight} kg
                </p>
                <p className="text-lg font-medium text-gray-900 border-2 border-[#F8E8EE] p-4 rounded-md">
                  Broj parčića: {weight * 8}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <p className="text-lg font-medium border-2 border-[#F8E8EE] p-4  text-gray-900">
                Cena: {weight * cake.pricePerKilo + cake.decorationPrice} RSD
              </p>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#132743] border border-transparent rounded-md py-3 px-8 text-base font-medium text-white hover:bg-[#749dd8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#749dd8]"
              >
                Dodaj u korpu
              </button>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                Ili pozovite 011 2345 678 / 060 123 45 67
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
