import { Navigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Bag from "../pages/Bag";
import Payment from "../pages/Payment";
import ConfirmationSuccess from "../pages/ConfirmationSuccess";

export const routes = [
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
];
