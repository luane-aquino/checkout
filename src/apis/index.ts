export const getProducts = async () => {
  const res = await fetch("/mocks/productMock.json");
  return res.json();
};
