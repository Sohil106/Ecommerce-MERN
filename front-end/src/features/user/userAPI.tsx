import { LoggedinUser } from "../../models/Modal";
import { Order } from "../../models/Order";

export function fetchLoggedinUser(userId: string) {
  return new Promise<{ data: LoggedinUser }>(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users/${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedinUserOrders(userId: string) {
  return new Promise<{ data: Order[] }>(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/orders/?user=${userId}`
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(userData: LoggedinUser) {
  return new Promise<{ data: LoggedinUser }>(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users/${userData.id}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    // TODO : on sever it will only return relevent information(not password)
    resolve({ data });
  });
}
