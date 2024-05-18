import { OrderType } from "models/order";

export const customerDocument = "12345678900";
const base_url = process.env.REACT_APP_BASE_URL;

export const getProducts = async () => {
  const res = await fetch(`${base_url}/${customerDocument}/cart`, {
    mode: "no-cors",
  });
  console.log("***[res]", res);
  const cart = await res.json();
  console.log("***[cart]", cart);
  return cart;
};

export const makeCheckout = async (order: OrderType) => {
  const response = await fetch(`${base_url}/${customerDocument}/checkout`, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
};
