import { MongoServerError } from "mongodb";
import { OrderType } from "./models/order";
import { getClient, getCollection } from "./helpers";

export const getCartByUser = async (document: string) => {
  let client = null;
  try {
    client = await getClient();
    const cartsCollection = await getCollection("carts", client);
    const query = { "customer.document": document };
    const cart = await cartsCollection.findOne(query);
    return cart;
  } catch (error) {
    console.log("***[Error in getCartByUser]");
    if (error instanceof MongoServerError) {
      console.log(`Error worth logging: ${error}`); // special case for some reason
    }
    throw error; // still want to crash
  } finally {
    await client?.close();
  }
};

export const getUserOrderCountByDate = async (document: string) => {
  let client = null;
  try {
    client = await getClient();
    const ordersCollection = await getCollection("orders", client);

    // Get today's date at midnight in local time zone
    let start = new Date();
    start.setHours(0, 0, 0, 0);

    // Get tomorrow's date at midnight in local time zone
    let end = new Date(start);
    end.setDate(end.getDate() + 1);

    const query = {
      document: document,
      created_at: { $gte: start.toISOString(), $lt: end.toISOString() },
    };
    return await ordersCollection.countDocuments(query);
  } catch {
    console.log("***[Error in getUserOrderCountByDate]");
  } finally {
    await client?.close();
  }
};

export const addOrder = async (order: OrderType) => {
  let client = null;
  try {
    client = await getClient();
    const ordersCollection = await getCollection("orders", client);

    await ordersCollection.insertOne(order);
  } catch {
    console.error("***[Error in addOrder]");
    throw new Error("could not save data in DB");
  } finally {
    await client?.close();
  }
};
