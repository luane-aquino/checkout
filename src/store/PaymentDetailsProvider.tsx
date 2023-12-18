import React, { useContext, useState } from "react";

type PaymentType = {
  payment: {
    cardNumber: string;
    cardHolderName: string;
    cardValidUntil: string;
  };
};

const data: PaymentType = {
  payment: { cardNumber: "", cardHolderName: "", cardValidUntil: "" },
};

export const PaymentContext = React.createContext<any>(data);

export const usePayment = () => useContext(PaymentContext);

type PaymentDetailsProviderProps = {
  children?: React.ReactElement;
};

export default function PaymentDetailsProvider({
  children,
}: PaymentDetailsProviderProps) {
  const [payment, setPayment] = useState<PaymentType>(data);

  const setPaymentValue = (value: any) => {
    setPayment(value);
  };

  return (
    <PaymentContext.Provider value={{ payment, setPaymentValue }}>
      {children}
    </PaymentContext.Provider>
  );
}
