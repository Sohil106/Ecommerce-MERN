"use client";

import { Link, Navigate } from "react-router-dom";
import { AllRoutes, discountedPrice } from "../../constants/constants";
import {
  deleteCartItemAsync,
  updateCartItemAsync,
  useSelectorCartState,
} from "./cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { CartItem } from "../../models/CartItem";

// const products = [
//   {
//     id: 1,
//     name: "Throwback Hip Bag",
//     href: "#",
//     color: "Salmon",
//     price: "$90.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
//     imageAlt:
//       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
//   },
//   {
//     id: 2,
//     name: "Medium Stuff Satchel",
//     href: "#",
//     color: "Blue",
//     price: "$32.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
//     imageAlt:
//       "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
//   },
//   // More products...
// ];

const Cart = () => {
  const { items } = useSelectorCartState();
  const dispatch = useDispatch<AppDispatch>();
  const totalAmount =
    Math.round(
      items.reduce(
        (amount, item) => discountedPrice(item) * item.quantity + amount,
        0
      ) * 100
    ) / 100;
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    item: CartItem
  ) => {
    await dispatch(updateCartItemAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = async (id: string) => {
    await dispatch(deleteCartItemAsync(id));
  };
  return (
    <>
      {!items.length && (
        <Navigate to={AllRoutes.Home} replace={true}></Navigate>
      )}
      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
        <div className=" border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            Cart
          </h1>

          <div className="flow-root">
            <ul
              role="list"
              className="-my-6 divide-y divide-gray-200 border-b-[1px] border-gray-200"
            >
              {items.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={product.title}
                      src={product.thumbnail}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.thumbnail}>{product.title}</a>
                        </h3>
                        <div className="">
                          <p className="">${discountedPrice(product)}</p>
                          <p className="text-sm font-medium line-through text-gray-400">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="quantity"
                          className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <select
                          name="quantity"
                          id="quantity"
                          onChange={(e) => handleQuantity(e, product)}
                          value={product.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => handleRemove(product.id.toString())}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex my-2 justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex my-2 justify-between text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to={AllRoutes.Checkout}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link
                to={AllRoutes.Home}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
