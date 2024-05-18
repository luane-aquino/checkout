import { Navigate } from "react-router-dom";
import Bag from "pages/Bag";
import Payment from "pages/Payment";
import ConfirmationSuccess from "pages/ConfirmationSuccess";
import Error from "pages/Error";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/bag" />,
  },
  {
    path: "/bag",
    element: <Bag />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/confirmation",
    element: <ConfirmationSuccess />,
  },
  {
    path: "/error",
    element: <Error />,
  },
];
