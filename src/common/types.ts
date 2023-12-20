export enum TabContentItemEnum {
  bag = "bag",
  payment = "payment",
  success = "success",
}

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
