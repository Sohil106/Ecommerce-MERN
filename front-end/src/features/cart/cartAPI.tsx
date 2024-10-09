import {
  CartItem,
  CartItemForUpdate,
  CartItemWithoutId,
} from "../../models/CartItem";

export function addToCart(item: CartItemWithoutId) {
  return new Promise<{ data: CartItem }>(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO : on sever it will only return relevent information(not password)
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId: string) {
  return new Promise<{ data: CartItem[] }>(async (resolve) => {
    //TODO: we will not hard code server URL here
    const response = await fetch(`http://localhost:8080/cart?user=${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}
export function updateCartItem(item: CartItemForUpdate) {
  return new Promise<{ data: CartItem }>(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO : on sever it will only return relevent information(not password)
    resolve({ data });
  });
}

export function deleteCartItem(itemId: string) {
  return new Promise<{ data: { id: string } }>(async (resolve) => {
    await fetch(`http://localhost:8080/cart/${itemId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    // TODO : on sever it will only return relevent information(not password)
    resolve({ data: { id: itemId } });
  });
}

export async function resetCart(userId: string) {
  //get all items of user's cart - and then delete each
  return new Promise<{ status: string }>(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await deleteCartItem(item.id.toString());
    }
    resolve({ status: "success" });
  });
}
