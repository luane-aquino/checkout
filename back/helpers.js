const PURCHASE_LIMIT_PER_DAY = 3;

const canMakeNewPurchase = (customerDocument, dateOfPurchase) => {
  const customerPurchases = orders.filter(
    (purchase) => purchase.document === customerDocument,
  );
  // user has few purchases in total, so it means can make new purchase
  if (customerPurchases.length < PURCHASE_LIMIT_PER_DAY) {
    return true;
  }
  // user has many purchases, so we need to check how many purchases per date
  let purchasesQuantity = 0;
  for (const order of customerPurchases) {
    if (getDate(dateOfPurchase) === getDate(order.createdAt)) {
      ++purchasesQuantity;
    }
    if (purchasesQuantity >= PURCHASE_LIMIT_PER_DAY) break;
  }
  return purchasesQuantity < PURCHASE_LIMIT_PER_DAY;
};

const getDate = (dateISOStringFormat) => {
  return dateISOStringFormat.split("T")[0];
};

const purchaseDateIsIncorrect = (purchaseDate) => {
  const currentDate = getDate(new Date().toISOString());
  return getDate(purchaseDate) !== currentDate;
};

module.exports = {
  canMakeNewPurchase,
  purchaseDateIsIncorrect,
};
