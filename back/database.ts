import { MongoClient, MongoServerError } from "mongodb";
import { OrderType } from "./models/order";

const uri = process.env.MONGODB_STRING_CONNECTION;
const client = new MongoClient(uri!);

export const getCartByUser = async (document: string) => {
  try {
    const client = new MongoClient(uri!);
    await client.connect();
    const database = client.db("online_store");
    const cartsCollection = database.collection("carts");
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
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

export const getUserOrderCountByDate = async (document: string) => {
  try {
    const client = new MongoClient(uri!);
    await client.connect();
    const database = client.db("online_store");
    const ordersCollection = database.collection("orders");

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
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

export const addOrder = async (order: OrderType) => {
  try {
    const client = new MongoClient(uri!);
    await client.connect();
    const database = client.db("online_store");
    const ordersCollection = database.collection("orders");

    await ordersCollection.insertOne(order);
  } catch {
    console.log("***[Error in addOrder]");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
