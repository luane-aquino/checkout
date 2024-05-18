import React, { useContext, useState } from "react";

export type PaymentType = {
  cardNumber: string;
  cardHolderName: string;
  cardValidUntil: string;
  cvv: string;
};

export type PaymentContextType = {
  payment: PaymentType;
  setPaymentValue: (value: PaymentType) => void;
};

const data: PaymentType = {
  cardNumber: "",
  cardHolderName: "",
  cardValidUntil: "",
  cvv: "",
};

export const PaymentContext = React.createContext<PaymentContextType | null>(
  null,
);

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
