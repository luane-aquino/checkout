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
import PaymentDetailsProvider from "./store/PaymentDetailsProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();
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

  return (
    <PaymentDetailsProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </PaymentDetailsProvider>
  );
};

export default App;
