import { useDispatch } from "react-redux";
// import { useSelectorAuthState } from "../../auth/authSlice";
import { updateUserAsync, useSelectorUserState } from "../userSlice";
import { AppDispatch } from "../../store";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

const UserProfile = () => {
  const { userInfo } = useSelectorUserState();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  //TODO : We will add paynent section when we work on backend.

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
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      country: "",
    },
  });

  const handleRemove = async (index: number) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1);
    await dispatch(updateUserAsync(newUser));
  };

  const handleEdit = async (addressUpdate: IFormInputs, index: number) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    await dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };
  const handleEditForm = (index: number) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("country", address.country);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("zipcode", address.zipcode);
    setValue("phone", address.phone);
  };

  const handleAdd = async (newAddress: IFormInputs) => {
    const newUser = {
      ...userInfo,
      addresses: [...userInfo.addresses, newAddress],
    };
    await dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  return (
    <div>
      <div className="mx-auto mt-12 max-w-full px-4 sm:px-6 lg:px-8 bg-white">
        <div className=" border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            Name : {userInfo.email.split("@")[0]}
          </h1>
          <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
            Email address : {userInfo?.email}
          </h3>
          {userInfo?.role === "admin" && (
            <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
              Role : {userInfo?.role}
            </h3>
          )}
        </div>

        <div className="border-gray-200 px-4 pb-6 sm:px-6">
          <button
            type="button"
            onClick={() => {
              reset();
              setSelectedEditIndex(-1);
              setShowAddAddressForm(true);
            }}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Address
          </button>

          {showAddAddressForm && (
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                handleAdd(data);
                reset();
              })}
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
                    onClick={() => {
                      setSelectedEditIndex(-1), reset();
                    }}
                    className="text-sm font-semibold leading-6 text-gray-900 rounded-md px-3 py-2 hover:bg-indigo-600 hover:text-white"
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
              </div>
            </form>
          )}
        </div>

        {userInfo?.addresses && userInfo?.addresses.length > 0 && (
          <div className="border-gray-200 px-4 pb-6 sm:px-6">
            <p className="mt-0.5 text-sm text-gray-500  pt-4">
              Your Addresses :
            </p>
            {userInfo?.addresses.map((address: any, index: number) => (
              <div key={index}>
                {selectedEditIndex === index && (
                  <form
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      handleEdit(data, index);
                      reset();
                    })}
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
                          onClick={() => {
                            setSelectedEditIndex(-1);
                          }}
                          className="text-sm font-semibold leading-6 text-gray-900 rounded-md px-3 py-2 hover:bg-indigo-600 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2">
                  <div className="flex min-w-0 gap-x-4">
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
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => {
                        reset();
                        setShowAddAddressForm(false);
                        handleEditForm(index);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
