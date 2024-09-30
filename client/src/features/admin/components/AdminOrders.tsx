import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { discountedPrice, ITEMS_PER_PAGE } from "../../../constants/constants";
import {
  fetchAllOrdersAync,
  updateOrderAsync,
  useSelectorOrderState,
} from "../../order/orderSlice";
import { AppDispatch } from "../../store";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Order } from "../../../models/Order";
import Pagination from "../../common/Pagination";

const AdminOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const [editOrderId, setEditOrderId] = useState<string>("");
  const { orders, totalOrders } = useSelectorOrderState();
  const [sort, setSort] = useState({});

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAync({ sort, pagination }));
  }, [dispatch, sort, page]);

  const handleShow = (order: Order) => {
    console.log(order);
  };
  const handleEdit = (id: string) => {
    setEditOrderId(id);
  };

  const handleUpdate = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    order: Order
  ) => {
    const updatedOrder = { ...order, status: e.target.value };
    await dispatch(updateOrderAsync(updatedOrder));
    setEditOrderId("");
  };

  const handlePage = (page: number) => {
    setPage(page);
  };

  const chooseColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };
  // type sortOptions = {
  //   [key: string]: string[];
  // };

  interface SortOption {
    sort: string;
    order: string;
  }
  const handleSort = (sortOptions: SortOption) => {
    const sort = { _sort: sortOptions.sort, _order: sortOptions.order };
    setSort(sort);
  };
  return (
    <>
      <div className="overflow-x-auto">
        <div className=" bg-gray-100 flex items-center justify-center font-sans">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={() =>
                        handleSort({
                          sort: sort._order === "asc" ? "-id" : "id",
                          order: sort._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order #
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-left">Total</th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`${
                        index % 2 !== 0 ? "bg-gray-50" : ""
                      } border-b border-gray-200 hover:bg-gray-100`}
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">#{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div className="flex items-center" key={item.id}>
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                              />
                            </div>
                            <span>
                              {item.title} - #{item.quantity} - $
                              {discountedPrice(item)}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-7 text-left">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>,{" "}
                        </div>
                        <div>{order.selectedAddress.street}, </div>
                        <div> {order.selectedAddress.city}, </div>
                        <div> {order.selectedAddress.state}, </div>
                        <div> {order.selectedAddress.zipcode}, </div>
                        <div>{order.selectedAddress.phone}</div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {order.items.length}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editOrderId ? (
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdate(e, order)}
                          >
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center gap-3">
                          <div
                            className="w-5 h-5 cursor-pointer mr-2 transform hover:text-purple-500 hover:scale-110"
                            onClick={() => handleShow(order)}
                          >
                            <EyeIcon />
                          </div>
                          <div
                            className="w-5 h-5 cursor-pointer mr-2 transform hover:text-purple-500 hover:scale-110"
                            onClick={() => handleEdit(order.id)}
                          >
                            <PencilIcon />
                          </div>
                          {/* <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <TrashIcon />
                          </div> */}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <img
                            className="w-6 h-6"
                            src="https://img.icons8.com/color/100/000000/vue-js.png"
                          />
                        </div>
                        <span className="font-medium">Vue Project</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <img
                            className="w-6 h-6 rounded-full"
                            src="https://randomuser.me/api/portraits/women/2.jpg"
                          />
                        </div>
                        <span>Anita Rodriquez</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <img
                          className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
                          src="https://randomuser.me/api/portraits/men/1.jpg"
                        />
                        <img
                          className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                          src="https://randomuser.me/api/portraits/women/2.jpg"
                        />
                        <img
                          className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                          src="https://randomuser.me/api/portraits/men/3.jpg"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                        Completed
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </div>
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* pagination component */}
        <div>
          <Pagination
            handlePage={handlePage}
            page={page}
            setPage={setPage}
            totalItems={totalOrders}
          />
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
