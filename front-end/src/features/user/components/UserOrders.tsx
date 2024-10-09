import { useDispatch } from "react-redux";
// import { useSelectorAuthState } from "../../auth/authSlice";
import { useEffect } from "react";
import {
  fetchLoggedinUserOrdersAsync,
  useSelectorUserState,
} from "../userSlice";
import { AppDispatch } from "../../store";
import { discountedPrice } from "../../../constants/constants";
import { CartItem } from "../../../models/CartItem";

const UserOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const { loggedInUser } = useSelectorAuthState();
  const { userInfo } = useSelectorUserState();
  const { userOrders } = useSelectorUserState();

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(fetchLoggedinUserOrdersAsync(userInfo.id));
    }
  }, [userInfo?.id]);
  return (
    <div>
      {userOrders.map((userOrder) => (
        <div key={userOrder.id}>
          <div className="mx-auto mt-12 max-w-full px-4 sm:px-6 lg:px-8 bg-white">
            <div className=" border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                Order # {userOrder.id}
              </h1>
              <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                Status : {userOrder.status}
              </h3>

              <div className="flow-root">
                <ul role="list" className="-my-6  ">
                  {userOrder.items.map((item: CartItem) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          alt={item.product.title}
                          src={item.product.thumbnail}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.thumbnail}>
                                {item.product.title}
                              </a>
                            </h3>
                            <div className="">
                              <p className="">
                                $
                                {discountedPrice(
                                  item.product.price,
                                  item.product.discountPercentage
                                )}
                              </p>
                              <p className="text-sm font-medium line-through text-gray-400">
                                ${item.product.price}
                              </p>
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty:{item.quantity}
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-gray-200 px-4 pb-6 sm:px-6">
              <div className="flex my-2 justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${userOrder.totalAmount}</p>
              </div>
              <div className="flex my-2 justify-between text-base font-medium text-gray-900">
                <p>Total Items in Order</p>
                <p>{userOrder.totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500  pt-4">
                Shipping Address :
              </p>
              <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {userOrder.selectedAddress.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {userOrder.selectedAddress.email}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {userOrder.selectedAddress.phone}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Street: {userOrder.selectedAddress.street}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    City: {userOrder.selectedAddress.city}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    Pincode: {userOrder.selectedAddress.zipcode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
