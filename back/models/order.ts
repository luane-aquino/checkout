import Joi from "joi";

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

export const orderSchema = Joi.object({
  created_at: Joi.string().required(),
  document: Joi.string().required(),
  products: Joi.array().items(
    Joi.object({
      description: Joi.string().required(),
      image_url: Joi.string().required(),
      price: Joi.number().required(),
      price_without_discount: Joi.number().allow(null),
    }),
  ),
  payment: Joi.object({
    card_holder_name: Joi.string().required(),
    card_number: Joi.string().required(),
    card_valid_until: Joi.string().required(),
    cvv: Joi.string().required(),
  }),
  payment_plan: Joi.object({
    total: Joi.number().required(),
    shipping: Joi.number().required(),
    discount: Joi.number().required(),
    subtotal: Joi.number().required(),
  }),
});
