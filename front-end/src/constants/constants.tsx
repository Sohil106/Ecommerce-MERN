import { CartItem, CartItemWithoutId } from "../models/CartItem";
import { Product, ProductWithoutId } from "../models/Product";

export const ITEMS_PER_PAGE = 10;

export const AllRoutes = {
  Home: "/",
  Signup: "/signup",
  Login: "/login",
  Logout: "/logout",
  ForgotPassword: "/forgot-password",
  Cart: "/cart",
  Checkout: "/checkout",
  ProductDetail: "/product-detail/:id",
  OrderSuccess: "/order-success/:id",
  Orders: "/orders",
  Profile: "/profile",
  Admin: "/admin",
  ProductForm: "/admin/product-form",
  EditProductForm: "/admin/product-form/edit/:id",
  AdminOrders: "/admin/orders",
};

export const discountedPrice = (
  price: number,
  disCountetPercentage: number
) => {
  {
    return Math.round(price * (1 - disCountetPercentage / 100) * 100) / 100;
  }
};
