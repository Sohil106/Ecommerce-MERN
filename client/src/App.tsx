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
    path: `${AllRoutes.Login}`,
    element: <LoginPage />,
  },
  {
    path: `${AllRoutes.Signup}`,
    element: <SignupPage />,
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
]);
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { loggedInUser } = useSelectorAuthState();
  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchItemsByUserIdAsync(loggedInUser?.id));
    }
  }, [dispatch, loggedInUser?.id]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
