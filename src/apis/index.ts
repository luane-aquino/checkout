export const getProducts = async () => {
  const res = await fetch(
    "https://run.mocky.io/v3/8469a25f-59d8-4d55-9973-2d96ccabe6ed",
  );
  return res.json();
};
