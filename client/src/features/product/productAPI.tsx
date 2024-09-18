import { Product } from "../models/Product";
import { FilterOption } from "./components/ProductList";

export interface ProductResponse {
  products: Product[];
  totalItems: number;
}

export function fetchAllProducts() {
  return new Promise<{ data: Product[] }>(async (resolve) => {
    //TODO: we will not hard code server URL here
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(
  filter: Record<string, string | string[]>,
  sort: Record<string, string>,
  pagination: Record<number, number>
) {
  //sort = {_sort:"price",_order="desc"}
  // filter = {"category" : "smartphone"}
  //filter = {"category" : ["smartphone","laptops"]}
  //pagination = {_page=1,_limit= 10}

  //TODO : on server we will support multi values(categories)
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise<{ data: ProductResponse }>(async (resolve, reject) => {
    //TODO: we will not hard code server URL here
    try {
      const response = await fetch(
        `http://localhost:8080/products?${queryString}`
      );
      const totalItemsHeader = response.headers.get("X-Total-Count");
      const totalItems = totalItemsHeader ? parseInt(totalItemsHeader, 10) : 0;
      const products: Product[] = await response.json();

      resolve({ data: { products, totalItems } });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchCategories() {
  return new Promise<{ data: FilterOption[] }>(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise<{ data: FilterOption[] }>(async (resolve) => {
    //TODO: we will not hard code server URL here
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id: string) {
  return new Promise<{ data: Product[] }>(async (resolve) => {
    //TODO: we will not hard code server URL here
    const response = await fetch(`http://localhost:8080/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}
