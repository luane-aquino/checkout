export const formatToBrazilianCurrency = (value: number) => {
  const number = new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
  });

  return number.format(value);
};
