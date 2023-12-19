import React, { useContext, useState } from "react";

type PaymentType = {
  cardNumber: string;
  cardHolderName: string;
  cardValidUntil: string;
  cvv: string;
};

const data: PaymentType = {
  cardNumber: "",
  cardHolderName: "",
  cardValidUntil: "",
  cvv: "",
};

// TODO refact type
export const PaymentContext = React.createContext<any>(data);

export const usePayment = () => useContext(PaymentContext);

type PaymentDetailsProviderProps = {
  children?: React.ReactElement;
};

export default function PaymentDetailsProvider({
  children,
}: PaymentDetailsProviderProps) {
  const [payment, setPayment] = useState<PaymentType>(data);

  const setPaymentValue = (value: PaymentType) => {
    setPayment(value);
  };

  return (
    <PaymentContext.Provider value={{ payment, setPaymentValue }}>
      {children}
    </PaymentContext.Provider>
  );
}
