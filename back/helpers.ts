import { getUserOrderCountByDate } from "./database";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_STRING_CONNECTION;
const PURCHASE_LIMIT_PER_DAY = 3;

export const canMakeNewPurchase = async (customerDocument: string) => {
  try {
    const count = await getUserOrderCountByDate(customerDocument);

    return isValid(count) ? count! < PURCHASE_LIMIT_PER_DAY : false;
  } catch {
    console.log("***[Error in canMakeNewPurchase]");
    return false;
  }
};

const isValid = (value: unknown): boolean => {
  if (typeof value === "number" || typeof value === "string") {
    return true;
  }
  return false;
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

export const getCollection = async (
  collectionName: string,
  client: MongoClient,
) => {
  const database = client.db("online_store");
  const collection = database.collection(collectionName);
  return collection;
};

export const getClient = async () => {
  const client = new MongoClient(uri!);
  await client.connect();
  return client;
};
