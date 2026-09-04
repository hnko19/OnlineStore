import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./Component/Login/Login.jsx";
import Register from "./Component/Register/Register.jsx";
import Layout from "./Component/Layout/Layout.jsx";
import Home from "./Component/Home/Home.jsx";
import Brands from "./Component/Brands/Brands.jsx";
import Cart from "./Component/Cart/Cart.jsx";
import Catergories from "./Component/Catergories/Catergories.jsx";
import NotFound from "./Component/NotFound/NotFound.jsx";
import { useContext } from "react";
import AuthContextProvider from "./Context/AuthContext.jsx";
import ProtuctedRoute from "./Component/ProtuctedRoute/ProtuctedRoute.jsx";
import ProductDetails from "./Component/ProductDetails/ProductDetails.jsx";
import { ToastContainer } from "react-toastify";
import ShippingAddress from "./Component/ShippingAddress/ShippingAddress.jsx";
import Products from "./Component/Products/Products.jsx";
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword.jsx";
import Verify from "./Component/Verify/Verify.jsx";
import ResetPassword from "./Component/ResetPassword/ResetPassword.jsx";
import WishList from "./Component/WishList/WishList.jsx";
import UserOrders from "./Component/UserOrders/UserOrders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BrandDetail from "./Component/BrandDetail/BrandDetail.jsx";
import BrandProduct from "./Component/BrandProduct/BrandProduct.jsx";
import CategoryProduct from "./Component/CategoryProduct/CategoryProduct.jsx";

const queryClient = new QueryClient();
function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "OnlineStore", element: <Home /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "verify/:email", element: <Verify /> },
        { path: "resetpassword/:email", element: <ResetPassword /> },
        { path: "brands", element: <Brands /> },
        {
          path: "brandproduct/:brandId",
          element: (
            <ProtuctedRoute>
              <BrandProduct />
            </ProtuctedRoute>
          ),
        },
        { path: "products", element: <Products /> },
        {
          path: "cart",
          element: (
            <ProtuctedRoute>
              <Cart />
            </ProtuctedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtuctedRoute>
              <Catergories />
            </ProtuctedRoute>
          ),
        },
        {
          path: "categoryproduct/:catId",
          element: (
            <ProtuctedRoute>
              <CategoryProduct />
            </ProtuctedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtuctedRoute>
              <WishList />
            </ProtuctedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtuctedRoute>
              <ProductDetails />
            </ProtuctedRoute>
          ),
        },
        {
          path: "shippingaddress/:cartId",
          element: (
            <ProtuctedRoute>
              <ShippingAddress />
            </ProtuctedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtuctedRoute>
              <UserOrders />
            </ProtuctedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
