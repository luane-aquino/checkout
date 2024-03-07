export const getProducts = async () => {
  const res = await fetch("http://localhost:5000/cart");
  return res.json();
};
