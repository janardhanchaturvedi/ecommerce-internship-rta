import React from 'react'
import Home from './components/home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return (
    <RouterProvider router={router} />
  )
}
