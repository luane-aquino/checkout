import { getUserOrderCountByDate } from "./database";

const PURCHASE_LIMIT_PER_DAY = 3;

export const canMakeNewPurchase = async (customerDocument: string) => {
  try {
    const count = await getUserOrderCountByDate(customerDocument);
    if (count === undefined || count === null) {
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

export const getDate = (dateISOStringFormat: string) => {
  if (dateISOStringFormat) {
    return dateISOStringFormat.split("T")[0];
  }
  return "";
};

export const purchaseDateIsIncorrect = (purchaseDate: string) => {
  const currentDate = getDate(new Date().toISOString());
  return getDate(purchaseDate) !== currentDate;
};
