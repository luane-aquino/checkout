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

type PaymentContextType = {
  payment: PaymentType;
  setPaymentValue: (value: PaymentType) => void;
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
