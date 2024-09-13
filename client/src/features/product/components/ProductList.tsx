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
  fetchAllProductsAsync,
  fetchProductsByFiltersAync,
  useSelectorProductState,
} from "../productSlice";
import { AppDispatch } from "../../store";
import { Product } from "../../models/Product";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];
const filters = [
  // {
  //   id: "color",
  //   name: "Color",
  //   options: [
  //     { value: "white", label: "White", checked: false },
  //     { value: "beige", label: "Beige", checked: false },
  //     { value: "blue", label: "Blue", checked: true },
  //     { value: "brown", label: "Brown", checked: false },
  //     { value: "green", label: "Green", checked: false },
  //     { value: "purple", label: "Purple", checked: false },
  //   ],
  // },
  // {
  //   id: "size",
  //   name: "Size",
  //   options: [
  //     { value: "2l", label: "2L", checked: false },
  //     { value: "6l", label: "6L", checked: false },
  //     { value: "12l", label: "12L", checked: false },
  //     { value: "18l", label: "18L", checked: false },
  //     { value: "20l", label: "20L", checked: false },
  //     { value: "40l", label: "40L", checked: true },
  //   ],
  // },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "beauty", label: "beauty", checked: false },
      { value: "fragrances", label: "fragrances", checked: false },
      { value: "furniture", label: "furniture", checked: false },
      { value: "groceries", label: "groceries", checked: false },
      {
        value: "home-decoration",
        label: "home decoration",
        checked: false,
      },
      {
        value: "kitchen-accessories",
        label: "kitchen accessories",
        checked: false,
      },
      { value: "laptops", label: "laptops", checked: false },
      { value: "mens-shirts", label: "mens shirts", checked: false },
      { value: "mens-shoes", label: "mens shoes", checked: false },
      { value: "mens-watches", label: "mens watches", checked: false },
      {
        value: "mobile-accessories",
        label: "mobile accessories",
        checked: false,
      },
      { value: "motorcycle", label: "motorcycle", checked: false },
      { value: "skin-care", label: "skin care", checked: false },
      { value: "smartphones", label: "smartphones", checked: false },
      {
        value: "sports-accessories",
        label: "sports accessories",
        checked: false,
      },
      { value: "sunglasses", label: "sunglasses", checked: false },
      { value: "tablets", label: "tablets", checked: false },
      { value: "tops", label: "tops", checked: false },
      { value: "vehicle", label: "vehicle", checked: false },
      { value: "womens-bags", label: "womens bags", checked: false },
      { value: "womens-dresses", label: "womens dresses", checked: false },
      {
        value: "womens-jewellery",
        label: "womens jewellery",
        checked: false,
      },
      { value: "womens-shoes", label: "womens shoes", checked: false },
      { value: "womens-watches", label: "womens watches", checked: false },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "Essence", label: "Essence", checked: false },
      { value: "Glamour Beauty", label: "Glamour Beauty", checked: false },
      { value: "Velvet Touch", label: "Velvet Touch", checked: false },
      { value: "Chic Cosmetics", label: "Chic Cosmetics", checked: false },
      { value: "Nail Couture", label: "Nail Couture", checked: false },
      { value: "Calvin Klein", label: "Calvin Klein", checked: false },
      { value: "Chanel", label: "Chanel", checked: false },
      { value: "Dior", label: "Dior", checked: false },
      {
        value: "Dolce & Gabbana",
        label: "Dolce & Gabbana",
        checked: false,
      },
      { value: "Gucci", label: "Gucci", checked: false },
      {
        value: "Annibale Colombo",
        label: "Annibale Colombo",
        checked: false,
      },
      { value: "Furniture Co.", label: "Furniture Co.", checked: false },
      { value: "Knoll", label: "Knoll", checked: false },
      { value: "Bath Trends", label: "Bath Trends", checked: false },
      { value: "Apple", label: "Apple", checked: false },
      { value: "Asus", label: "Asus", checked: false },
      { value: "Huawei", label: "Huawei", checked: false },
      { value: "Lenovo", label: "Lenovo", checked: false },
      { value: "Dell", label: "Dell", checked: false },
      { value: "Fashion Trends", label: "Fashion Trends", checked: false },
      { value: "Gigabyte", label: "Gigabyte", checked: false },
      { value: "Classic Wear", label: "Classic Wear", checked: false },
      { value: "Casual Comfort", label: "Casual Comfort", checked: false },
      { value: "Urban Chic", label: "Urban Chic", checked: false },
      { value: "Nike", label: "Nike", checked: false },
      { value: "Puma", label: "Puma", checked: false },
      { value: "Off White", label: "Off White", checked: false },
      {
        value: "Fashion Timepieces",
        label: "Fashion Timepieces",
        checked: false,
      },
      { value: "Longines", label: "Longines", checked: false },
      { value: "Rolex", label: "Rolex", checked: false },
      { value: "Amazon", label: "Amazon", checked: false },
      { value: "Beats", label: "Beats", checked: false },
      { value: "TechGear", label: "TechGear", checked: false },
      { value: "GadgetMaster", label: "GadgetMaster", checked: false },
      { value: "SnapTech", label: "SnapTech", checked: false },
      { value: "ProVision", label: "ProVision", checked: false },
      { value: "Generic Motors", label: "Generic Motors", checked: false },
      { value: "Kawasaki", label: "Kawasaki", checked: false },
      { value: "MotoGP", label: "MotoGP", checked: false },
      { value: "ScootMaster", label: "ScootMaster", checked: false },
      { value: "SpeedMaster", label: "SpeedMaster", checked: false },
      { value: "Attitude", label: "Attitude", checked: false },
      { value: "Olay", label: "Olay", checked: false },
      { value: "Vaseline", label: "Vaseline", checked: false },
      { value: "Oppo", label: "Oppo", checked: false },
      { value: "Realme", label: "Realme", checked: false },
      { value: "Samsung", label: "Samsung", checked: false },
      { value: "Vivo", label: "Vivo", checked: false },
      { value: "Fashion Shades", label: "Fashion Shades", checked: false },
      { value: "Fashion Fun", label: "Fashion Fun", checked: false },
      { value: "Chrysler", label: "Chrysler", checked: false },
      { value: "Dodge", label: "Dodge", checked: false },
      { value: "Fashionista", label: "Fashionista", checked: false },
      { value: "Heshe", label: "Heshe", checked: false },
      { value: "Prada", label: "Prada", checked: false },
      {
        value: "Elegance Collection",
        label: "Elegance Collection",
        checked: false,
      },
      { value: "Comfort Trends", label: "Comfort Trends", checked: false },
      { value: "Fashion Diva", label: "Fashion Diva", checked: false },
      { value: "Pampi", label: "Pampi", checked: false },
      {
        value: "Fashion Express",
        label: "Fashion Express",
        checked: false,
      },
      { value: "IWC", label: "IWC", checked: false },
      { value: "Fashion Gold", label: "Fashion Gold", checked: false },
      { value: "Fashion Co.", label: "Fashion Co.", checked: false },
    ],
  },
];
// const oldProducts = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     thumbnail:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     title: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 2,
//     name: "Basic Tee",
//     href: "#",
//     thumbnail:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     title: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 3,
//     name: "Basic Tee",
//     href: "#",
//     thumbnail:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     title: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 4,
//     name: "Basic Tee",
//     href: "#",
//     thumbnail:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     title: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   // More products...
// ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface FilterOption {
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

const ProductList = () => {
  const { products } = useSelectorProductState();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState({});

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: FilterSection,
    option: FilterOption
  ) => {
    if (e.target.checked) {
      const newFilter = { ...filter, [section.id]: option.value };
      setFilter(newFilter);

      const getProductsByFilters = async () => {
        dispatch(fetchProductsByFiltersAync(newFilter));
      };
      getProductsByFilters();
    } else {
      const getAllProducts = async () => {
        await dispatch(fetchAllProductsAsync());
      };
      getAllProducts();
    }
  };

  const handleSort = (option: SortOption) => {
    const newFilter = { ...filter, _sort: option.sort, _order: option.order };
    setFilter(newFilter);

    const getProductsByFilters = async () => {
      dispatch(fetchProductsByFiltersAync(newFilter));
    };
    getProductsByFilters();
  };

  useEffect(() => {
    const getAllProducts = async () => {
      await dispatch(fetchAllProductsAsync());
    };
    getAllProducts();
  }, [dispatch]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          handleFilter={handleFilter}
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
              <DesktopFilter handleFilter={handleFilter} />

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
            <Pagination />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductList;

//MobileFilter Component
interface MobileFilterProps {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFilter: (
    e: React.ChangeEvent<HTMLInputElement>,
    section: FilterSection,
    option: FilterOption
  ) => void;
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
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
}
function DesktopFilter({ handleFilter }: DesktopFilterProps) {
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
function Pagination() {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </a>
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
