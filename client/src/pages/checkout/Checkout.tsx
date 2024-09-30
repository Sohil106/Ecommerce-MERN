import { Link, Navigate } from "react-router-dom";
import { AllRoutes, discountedPrice } from "../../constants/constants";
import {
  deleteCartItemAsync,
  updateCartItemAsync,
  useSelectorCartState,
} from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store";
import { CartItem } from "../../models/CartItem";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import { useSelectorAuthState } from "../../features/auth/authSlice";
import {
  updateUserAsync,
  useSelectorUserState,
} from "../../features/user/userSlice";
import { useState } from "react";
import { Address } from "../../models/Modal";
import {
  createOrderAsync,
  useSelectorOrderState,
} from "../../features/order/orderSlice";

// const addresses = [
//   {
//     name: "Dhairya Vadodariya",
//     email: "dhairya213@gmail.com",
//     street: "Yamuna Palace",
//     city: "Surat",
//     zipcode: "394101",
//     phone: "8932412345",
//   },
//   {
//     name: "Shubham Mangroliya",
//     email: "shubham321@gmail.com",
//     street: "CG Road",
//     city: "Amreli",
//     zipcode: "324152",
//     phone: "9987654345",
//   },
// ];

const Checkout = () => {
  const { items } = useSelectorCartState();
  // const { loggedInUser } = useSelectorAuthState();
  const { userInfo } = useSelectorUserState();
  const { currentOrder } = useSelectorOrderState();
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

  interface IFormInputs {
    name: string;
    email: string;
    country: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    phone: string;
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      country: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (userInfo && userInfo.id) {
      await dispatch(
        updateUserAsync({
          ...userInfo,
          addresses: [...userInfo.addresses, data],
        })
      );
      reset();
    }
  };

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const handleAddress = (index: number) => {
    if (userInfo) {
      setSelectedAddress(userInfo.addresses[index]);
    }
  };

  const handlePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = async () => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalAmount,
        totalItems,
        user: userInfo,
        paymentMethod,
        selectedAddress,
        status: "pending",
      };

      await dispatch(createOrderAsync(order));
    } else {
      alert("Enter Adderss and Payment method");
    }

    //TODO : redirect to order-success page
    //TODO : clear cart after order
    //TODO : on server change the sock number of items
  };
  return (
    <>
      {!items.length && (
        <Navigate to={AllRoutes.Home} replace={true}></Navigate>
      )}
      {currentOrder && (
        <Navigate
          to={`${AllRoutes.OrderSuccess.replace(":id", currentOrder.id)}`}
          replace={true}
        ></Navigate>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white px-5 py-2 my-2"
            >
              <div className="space-y-12">
                <div className=" border-gray-900/10">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("name", {
                            required: "name is required",
                          })}
                        />
                        {errors["name"] && (
                          <p className="text-red-500">
                            {errors["name"]?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("email", {
                            required: "email is required",
                            pattern: {
                              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                              message: "email is not valid",
                            },
                          })}
                        />
                        {errors["email"] && (
                          <p className="text-red-500">
                            {errors["email"]?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        {/* <select
                          id="country"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          {...register("country", {
                            required: "name is required",
                          })}
                        >
                          <option value="" selected disabled>
                            Choose Country
                          </option>
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="Mexico">Mexico</option>
                        </select> */}
                        <Controller
                          name="country"
                          control={control}
                          rules={{ required: "Country is required" }}
                          render={({ field }) => (
                            <select
                              id="country"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                              {...field}
                            >
                              <option value="" disabled>
                                Choose Country
                              </option>
                              <option value="India">India</option>
                              <option value="United States">
                                United States
                              </option>
                              <option value="Canada">Canada</option>
                              <option value="Mexico">Mexico</option>
                            </select>
                          )}
                        />
                        {errors["country"] && (
                          <p className="text-red-500">
                            {errors["country"]?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone-no"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Mobile Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("phone", {
                            required: "phone-no is required",
                          })}
                        />
                        {errors["phone"] && (
                          <p className="text-red-500">
                            {errors["phone"]?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("street", {
                            required: "street is required",
                          })}
                        />
                        {errors["street"] && (
                          <p className="text-red-500">
                            {errors["street"]?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("city", {
                            required: "city is required",
                          })}
                        />
                        {errors["city"] && (
                          <p className="text-red-500">
                            {errors["city"]?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          id="state"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("state", {
                            required: "state is required",
                          })}
                        />
                        {errors["state"] && (
                          <p className="text-red-500">
                            {errors["state"]?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="zipcode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="zipcode"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("zipcode", {
                            required: "zipcode is required",
                          })}
                        />
                        {errors["zipcode"] && (
                          <p className="text-red-500">
                            {errors["zipcode"]?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div className="border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose From Existing Address
                  </p>

                  <ul role="list" className="divide-y divide-gray-100">
                    {userInfo?.addresses.map((address: any, index: number) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <input
                            onChange={() => handleAddress(index)}
                            name="address"
                            type="radio"
                            className="px-2 mt-1 h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.email}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.phone}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            Street: {address.street}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            City: {address.city}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            Pincode: {address.zipcode}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            type="radio"
                            value="cash"
                            onChange={handlePayment}
                            checked={paymentMethod === "cash"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card-payment"
                            name="payments"
                            type="radio"
                            value="card-payment"
                            checked={paymentMethod === "card-payment"}
                            onChange={handlePayment}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card-payment"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-0 lg:px-0 bg-white">
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
                                onClick={() =>
                                  handleRemove(product.id.toString())
                                }
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
                  <button
                    onClick={handleOrder}
                    className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now
                  </button>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
