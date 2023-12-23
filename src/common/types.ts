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

export type ProductType = {
  imageUrl: string;
  description: string;
  price: number;
  oldPrice?: number;
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

export type CartContextType = {
  cart: CartType;
  setCartValue: (value: CartType) => void;
};
