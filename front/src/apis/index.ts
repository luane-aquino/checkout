import { OrderType } from "models/order";

export const customerDocument = "12345678900";

export const getProducts = async () => {
  const res = await fetch(
    `http://localhost:5000/api/customer/${customerDocument}/cart`,
  );
  return res.json();
};

export const makeCheckout = async (order: OrderType) => {
  const response = await fetch(
    `http://localhost:5000/api/customer/${customerDocument}/checkout`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    },
  );

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
};
