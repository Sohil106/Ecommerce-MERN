import { LoggedinUser } from "../../models/Modal";

export function fetchLoggedinUser(userId: string) {
  return new Promise<{ data: LoggedinUser }>(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users/${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedinUserOrders(userId: string) {
  return new Promise<{ data: any }>(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/orders/?user.id=${userId}`
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(userData: any) {
  return new Promise<{ data: any }>(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users/${userData.id}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO : on sever it will only return relevent information(not password)
    resolve({ data });
  });
}
