export const getProducts = async () => {
  const res = await fetch("http://localhost:5000/cart");
  return res.json();
};

// TODO refact any
export const sendPayment = async (payment: any) => {
  const res = await fetch("http://localhost:5000/payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  });
  return res.json();
};
