import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import CartPage from "./pages/cart/CartPage";
import Checkout from "./pages/checkout/Checkout";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";
import { AllRoutes } from "./constants/constants";
import Protected from "./features/auth/components/Protected";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./features/store";
import { useEffect } from "react";
import { useSelectorAuthState } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/not-found/PageNotFound";
import OrderSuccessPage from "./pages/order/OrderSuccessPage";
import UserOrdersPage from "./pages/order/UserOrdersPage";
import UserProfilePage from "./pages/profile/UserProfilePage";
import { fetchLoggedinUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/forgot-password/ForgotPasswordPage";
import AdminHome from "./pages/admin/home/AdminHome";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminProductDetailPage from "./pages/admin/product-detail/AdminProductDetailPage";
import AdminProductFormPage from "./pages/admin/product-form/AdminProductFormPage";
import AdminOrdersPage from "./pages/admin/admin-order/AdminOrdersPage";

const router = createBrowserRouter([
  {
    path: `${AllRoutes.Home}`,
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: `${AllRoutes.Admin}${AllRoutes.Home}`,
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: `${AllRoutes.Login}`,
    element: <LoginPage />,
  },
  {
    path: `${AllRoutes.Signup}`,
    element: <SignupPage />,
  },
  {
    path: `${AllRoutes.Logout}`,
    element: <Logout />,
  },
  {
    path: `${AllRoutes.ForgotPassword}`,
    element: <ForgotPasswordPage />,
  },
  {
    path: `${AllRoutes.Cart}`,
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: `${AllRoutes.Checkout}`,
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: `${AllRoutes.ProductDetail}`, //product-detail by id
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: `${AllRoutes.Admin}${AllRoutes.ProductDetail}`, //admin product-detail by id
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: `${AllRoutes.ProductForm}`, //admin product-form by id
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: `${AllRoutes.EditProductForm}`, //admin product-form by id
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: `${AllRoutes.AdminOrders}`,
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: `${AllRoutes.OrderSuccess}`,
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },
  {
    path: `${AllRoutes.Orders}`,
    element: (
      <Protected>
        <UserOrdersPage />
      </Protected>
    ),
  },
  {
    path: `${AllRoutes.Profile}`,
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },

  {
    path: `*`,
    element: <PageNotFound />,
  },
]);
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { loggedInUser } = useSelectorAuthState();
  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchItemsByUserIdAsync(loggedInUser.id));
      dispatch(fetchLoggedinUserAsync(loggedInUser.id));
    }
  }, [dispatch, loggedInUser?.id]);
  return (
    <div className="App">
      <RouterProvider router={router} />

      {/* Link mustr be inside the Provider */}
    </div>
  );
}

export default App;
