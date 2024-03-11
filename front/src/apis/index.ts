const customerDocument = "12345678900";

export const getProducts = async () => {
  const res = await fetch(
    `http://localhost:5000/api/customer/${customerDocument}/cart`,
  );
  return res.json();
};

// TODO refact any
export const sendPayment = async (payment: any) => {
  const res = await fetch(
    `http://localhost:5000/api/customer/${customerDocument}/payment`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payment),
    },
  );
  return res.json();
};
