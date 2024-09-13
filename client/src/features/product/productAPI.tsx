import { Product } from "../models/Product";

export function fetchAllProducts() {
  return new Promise<{ data: Product[] }>(async (resolve) => {
    //TODO: we will not hard code server URL here
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter: Record<string, string>) {
  // filter = {"category" : "smartphone"}
  //TODO : on server we will support multi values(categories)
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }
  return new Promise<{ data: Product[] }>(async (resolve) => {
    //TODO: we will not hard code server URL here
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
