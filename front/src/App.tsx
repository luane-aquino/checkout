import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PaymentDetailsProvider from "store/PaymentDetailsProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartProvider from "store/CartProvider";
import { routes } from "routes";

const App = () => {
  const queryClient = new QueryClient();
  const router = createBrowserRouter(routes);

  return (
    <PaymentDetailsProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </CartProvider>
    </PaymentDetailsProvider>
  );
};

export default App;
