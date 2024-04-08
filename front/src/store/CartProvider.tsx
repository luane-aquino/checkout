import React, { useCallback, useContext, useState } from "react";
import { ProductType } from "../pages/Bag";

export type CartContextType = {
  cart: CartType;
  setCartValue: (value: CartType) => void;
};

type PaymentPlanType = {
  total: number;
  shipping: number;
  discount: number;
  subtotal: number;
};

export type CartType = {
  paymentPlan: PaymentPlanType;
  products: ProductType[];
};

const data: CartType = {
  paymentPlan: {
    total: 0,
    shipping: 0,
    discount: 0,
    subtotal: 0,
  },
  products: [
    {
      description: "",
      imageUrl: "",
      price: 0,
      oldPrice: 0,
    },
    {
      description: "",
      imageUrl: "0",
      price: 0,
      oldPrice: 0,
    },
    {
      description: "",
      imageUrl: "",
      price: 0,
      oldPrice: 0,
    },
  ],
};

export const CartContext = React.createContext<CartContextType | null>(null);

export const useCart = () => useContext(CartContext);

type CartProviderProps = {
  children?: React.ReactElement;
};

export default function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartType>(data);

  const setCartValue = useCallback((value: CartType) => {
    setCart(value);
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCartValue }}>
      {children}
    </CartContext.Provider>
  );
}
