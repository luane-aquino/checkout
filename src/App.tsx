// App.js
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Bag from "./pages/Bag";
import Payment from "./pages/Payment";
import ConfirmationSuccess from "./pages/ConfirmationSuccess";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/bag" />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/bag",
      element: <Bag />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/payment",
      element: <Payment />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/confirmation",
      element: <ConfirmationSuccess />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
