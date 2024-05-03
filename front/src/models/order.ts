export type OrderType = {
  created_at: string;
  document: string;
  products: Product[];
  payment: Payment;
  payment_plan: PaymentPlan;
};

type Product = {
  description: string;
  image_url: string;
  price: number;
  price_without_discount?: number;
};

type Payment = {
  card_holder_name: string;
  card_number: string;
  card_valid_until: string;
  cvv: string;
};

type PaymentPlan = {
  total: number;
  shipping: number;
  discount: number;
  subtotal: number;
};
