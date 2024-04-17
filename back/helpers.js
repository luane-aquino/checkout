const { getUserOrderCountByDate } = require("./database");

const PURCHASE_LIMIT_PER_DAY = 3;

const canMakeNewPurchase = async (customerDocument, dateOfPurchase) => {
  try {
    const count = await getUserOrderCountByDate(customerDocument);
    if ((count === undefined) | (count === null)) {
      return false;
    }
    // user has few purchases in total, so it means can make new purchase
    if (count >= PURCHASE_LIMIT_PER_DAY) {
      return false;
    }
    return true;
  } catch {
    console.log("***[Error in canMakeNewPurchase]");
    return false;
  }
};

const getDate = (dateISOStringFormat) => {
  if (dateISOStringFormat) {
    return dateISOStringFormat.split("T")[0];
  }
  return "";
};

const purchaseDateIsIncorrect = (purchaseDate) => {
  const currentDate = getDate(new Date().toISOString());
  return getDate(purchaseDate) !== currentDate;
};

module.exports = {
  canMakeNewPurchase,
  purchaseDateIsIncorrect,
  getUserOrderCountByDate,
};
