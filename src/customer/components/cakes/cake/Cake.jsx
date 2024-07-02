import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Pagination from "@mui/material/Pagination";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cakesPagable } from "../../../../redux/customers/product/Action";
import { Backdrop, CircularProgress } from "@mui/material";
import CakeCard from "../cakeCard/CakeCard";
import { filters, singleFilter, sortOptions } from "./FilterData";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Cake() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const customersCake = useSelector((store) => store.customersCake);
  const cakes = useSelector((store) => store.customersCake.cakes);
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);

  const handleLoderClose = () => {
    setIsLoaderOpen(false);
  };

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const categoryValue = searchParams.get("category");
  const minWeightValue = searchParams.get("minWeight");
  const maxWeightValue = searchParams.get("maxWeight");
  const minTierValue = searchParams.get("minTier");
  const maxTierValue = searchParams.get("maxTier");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("pageNumber") || 0;

  const handleSortChange = (value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("pageNumber", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleCategoryFilterChange = (event) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("category", event.target.value); // Update category parameter
    searchParams.delete("pageNumber"); // Reset pageNumber when changing filters
    const query = searchParams.toString();
    navigate({ search: `?${query}` });

    // Dispatch cakesPagable with updated category
    dispatch(cakesPagable({
      category: event.target.value,
      minWeight: minWeightValue || 1,
      maxWeight: maxWeightValue || 30,
      minTier: minTierValue || 1,
      maxTier: maxTierValue || 4,
      sort: sortValue || "price_low",
      pageNumber: 0, // Reset page number to 0
      pageSize: 10,
    }));
  };

  useEffect(() => {
    const data = {
      category: categoryValue || "Specijal",
      minWeight: minWeightValue || 1,
      maxWeight: maxWeightValue || 30,
      minTier: minTierValue || 1,
      maxTier: maxTierValue || 4,
      sort: sortValue || "price_low",
      pageNumber: pageNumber || 0,
      pageSize: 10,
    };

    dispatch(cakesPagable(data));
  }, [
    categoryValue,
    minWeightValue,
    maxWeightValue,
    minTierValue,
    maxTierValue,
    sortValue,
    pageNumber,
    dispatch,
  ]);

  useEffect(() => {
    if (customersCake.loading) {
      setIsLoaderOpen(true);
    } else {
      setIsLoaderOpen(false);
    }
  }, [customersCake.loading]);
  console.log({ cakes });
  return (
<div className="bg-white -z-20">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.id === "category" ? (
                                  <FormControl>
                                    <RadioGroup
                                      value={categoryValue || "specijal"}
                                      onChange={handleCategoryFilterChange}
                                    >
                                      {section.options.map((option) => (
                                        <FormControlLabel
                                          key={option.value}
                                          value={option.value}
                                          control={<Radio />}
                                          label={option.label}
                                        />
                                      ))}
                                    </RadioGroup>
                                  </FormControl>
                                ) : null}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Kolači
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sortiraj
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.value}>
                          {({ active }) => (
                            <span
                              className={classNames(
                                option.value === sortValue
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                              onClick={() => handleSortChange(option.value)}
                            >
                              {option.name}
                            </span>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.id === "category" ? (
                              <FormControl>
                                <RadioGroup
                                  value={categoryValue || "specijal"}
                                  onChange={handleCategoryFilterChange}
                                >
                                  {section.options.map((option) => (
                                    <FormControlLabel
                                      key={option.value}
                                      value={option.value}
                                      control={<Radio />}
                                      label={option.label}
                                    />
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            ) : null}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
              {/* Product grid */}
              <div className="lg:col-span-3">
                {cakes.empty === false ? (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cakes.content.map((cake) => (
                      <CakeCard key={cake.id} cake={cake} />
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <p className="text-gray-500">
                      Nema kolača prema zadatim kriterijumima.
                    </p>
                  </div>
                )}
                {cakes.empty === false && (
                  <div className="flex justify-center mt-8">
                    <Pagination
                      count={cakes.totalPages}
                      page={cakes.pageable.pageNumber + 1}
                      onChange={handlePaginationChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoaderOpen}
        onClick={handleLoderClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
