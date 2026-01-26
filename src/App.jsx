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
export default function App() {
  const [user, setUser] = useState({ name: 'Jane Doe', age: 30 });
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
    }
  ]);
  return (
    <UserContext.Provider value={user}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}
