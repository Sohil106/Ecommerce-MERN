import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAync,
  useSelectorProductState,
} from "../productSlice";
import { AppDispatch } from "../../store";
import { Product } from "../../models/Product";
import { ITEMS_PER_PAGE } from "../../../constants/constants";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
}

interface FilterSection {
  id: string;
  name: string;
  options: FilterOption[];
}

interface SortOption {
  name: string;
  sort: string;
  order: string;
  current: boolean;
}

// Define a type for the filter object
type FilterState = {
  [key: string]: string[];
};

const ProductList = () => {
  const { products, categories, brands, totalItems } =
    useSelectorProductState();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: FilterSection,
    option: FilterOption
  ) => {
    const newFilter: FilterState = { ...filter };
    // TODO :  on server it will support multiple categories
    if (e.target.checked) {
      newFilter[section.id]?.length
        ? newFilter[section.id].push(option.value)
        : (newFilter[section.id] = [option.value]);
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({ newFilter });

    setFilter(newFilter);
  };

  const handleSort = (option: SortOption) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
    // console.log({ sort });
  };

  const handlePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    const getProductsByFilters = async () => {
      const pagiantion = { _page: page, _limit: ITEMS_PER_PAGE };
      await dispatch(fetchProductsByFiltersAync({ filter, sort, pagiantion }));
    };
    getProductsByFilters();
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);
  useEffect(() => {
    const fetchAsync = async () => {
      await dispatch(fetchBrandsAsync());
      await dispatch(fetchCategoriesAsync());
    };
    fetchAsync();
  }, []);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          handleFilter={handleFilter}
          filters={filters}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-2xl xs:text-base font-bold tracking-tight text-gray-900">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <p
                          onClick={() => handleSort(option)}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100 cursor-pointer"
                          )}
                        >
                          {option.name}
                        </p>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <DesktopFilter handleFilter={handleFilter} filters={filters} />

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Product List */}
                <ProductGrid products={products} />
              </div>
            </div>
          </section>
          {/* section of products and filters ends */}

          {/* pagination component */}
          <div>
            <Pagination
              handlePage={handlePage}
              page={page}
              setPage={setPage}
              totalItems={100}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
export default ProductList;
//main Component Ended here

//MobileFilter Component
interface MobileFilterProps {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFilter: (
    e: React.ChangeEvent<HTMLInputElement>,
    section: FilterSection,
    option: FilterOption
  ) => void;
  filters: FilterSection[];
}
function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}: MobileFilterProps) {
  return (
    <Dialog
      open={mobileFiltersOpen}
      onClose={setMobileFiltersOpen}
      className="relative z-40 lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Filters */}
          <form className="mt-4 border-t border-gray-200">
            {filters.map((section) => (
              <Disclosure
                key={section.id}
                as="div"
                className="border-t border-gray-200 px-4 py-6"
              >
                <h3 className="-mx-2 -my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon
                        aria-hidden="true"
                        className="h-5 w-5 group-data-[open]:hidden"
                      />
                      <MinusIcon
                        aria-hidden="true"
                        className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-6">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          defaultValue={option.value}
                          defaultChecked={option.checked}
                          id={`filter-mobile-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          onChange={(e) => handleFilter(e, section, option)}
                        />
                        <label
                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-500"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

//DesktopFilter Component
interface DesktopFilterProps {
  handleFilter: (
    e: React.ChangeEvent<HTMLInputElement>,
    section: FilterSection,
    option: FilterOption
  ) => void;
  filters: FilterSection[];
}
function DesktopFilter({ handleFilter, filters }: DesktopFilterProps) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          key={section.id}
          as="div"
          className="border-b border-gray-200 py-6"
        >
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
              <span className="ml-6 flex items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="h-5 w-5 group-data-[open]:hidden"
                />
                <MinusIcon
                  aria-hidden="true"
                  className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    defaultValue={option.value}
                    defaultChecked={option.checked}
                    id={`filter-${section.id}-${optionIdx}`}
                    name={`${section.id}[]`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={(e) => handleFilter(e, section, option)}
                  />
                  <label
                    htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </form>
  );
}

//Pagination Component
interface PaginationProps {
  handlePage: (page: number) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
}
function Pagination({
  handlePage,
  page,
  setPage,
  totalItems,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={() => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={() => handlePage(page < totalPages ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <div
              onClick={() => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center cursor-pointer rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: totalPages }).map((el, index) => (
              <div
                key={index}
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold cursor-pointer ${
                  index + 1 === page
                    ? "z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={() => handlePage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center cursor-pointer rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

//ProductGrid Component
interface ProductGridProps {
  products: Product[];
}
function ProductGrid({ products }: ProductGridProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Products
      </h2> */}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative  p-2 border-gray-200 border-2"
              onClick={() => navigate("product-detail")}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                <img
                  alt={product.title}
                  src={product.thumbnail}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <StarIcon className="w-6 h-6 inline" />
                      {product.rating}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    $
                    {Math.round(
                      product.price * (1 - product.discountPercentage / 100)
                    )}
                  </p>
                  <p className="text-sm font-medium line-through text-gray-400">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
