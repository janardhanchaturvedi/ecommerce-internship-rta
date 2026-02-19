import React, { useState } from 'react'
import Home from './components/home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Products from './components/products';
import ProductDetailPage from './components/productDetail';
import { UserContext } from './contexts/UserContext';
import LoginPage from './components/login';
import Signup from './components/signup';
import SellerSignup from './components/sellerSignup';
export default function App() {
  const [user, setUser] = useState(null);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/products",
      element: <Products />
    },
    {
      path: "/product/:id",
      element: <ProductDetailPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/seller/signup",
      element: <SellerSignup />
    }
  ]);
  return (
    <UserContext.Provider value={user}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}
