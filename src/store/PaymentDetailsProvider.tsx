import React, { useContext, useState } from "react";

const data = {
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
};

export const PaymentContext = React.createContext<any>(data);

export const usePayment = () => useContext(PaymentContext);

type PaymentDetailsProviderProps = {
  children?: React.ReactElement;
};

export default function PaymentDetailsProvider({
  children,
}: PaymentDetailsProviderProps) {
  const [payment, setPayment] = useState(data);

  const setPaymentValue = (value: any) => {
    setPayment(value);
  };

  return (
    <PaymentContext.Provider value={{ payment, setPaymentValue }}>
      {children}
    </PaymentContext.Provider>
  );
}
