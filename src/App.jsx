import React from 'react'
import Home from './components/home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Products from './components/products';
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/products",
      element: <Products />
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}
