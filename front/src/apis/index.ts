import { OrderType } from "models/order";

export const customerDocument = "12345678900";
const base_url = process.env.BASE_URL;

export const getProducts = async () => {
  const res = await fetch(`${base_url}/${customerDocument}/cart`);
  return res.json();
};

export const makeCheckout = async (order: OrderType) => {
  const response = await fetch(`${base_url}/${customerDocument}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
};
