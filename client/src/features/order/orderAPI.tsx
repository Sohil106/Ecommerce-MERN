import { Order, OrderWithoutId } from "../../models/Order";
export interface OrdersResponse {
  orders: Order[];
  totalOrders: number;
}

export function createOrder(order: OrderWithoutId) {
  return new Promise<{ data: Order }>(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO : on sever it will only return relevent information(not password)
    resolve({ data });
  });
}

export function updateOrder(order: Order) {
  return new Promise<{ data: Order }>(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders/${order.id}`, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(
  sort: Record<string, string>,
  pagination: Record<number, number>
) {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return new Promise<{ data: OrdersResponse }>(async (resolve, reject) => {
    //TODO: we will not hard code server URL here
    try {
      const response = await fetch(
        `http://localhost:8080/orders?${queryString}`
      );
      const ordersData: { data: Order[]; items: number } =
        await response.json();
      resolve({
        data: { orders: ordersData.data, totalOrders: ordersData.items },
      });
    } catch (error) {
      reject(error);
    }
  });
}
