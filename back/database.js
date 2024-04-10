const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_STRING_CONNECTION;
let client = undefined;

const getCartByUser = async (document) => {
  try {
    client = new MongoClient(uri);
    const database = client.db("online_store");
    const carts = database.collection("carts");

    const query = { "customer.document": document };
    const cart = await carts.findOne(query);

    return cart;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

const addOrder = async (order) => {
  try {
    client = new MongoClient(uri);
    const database = client.db("online_store");
    const carts = database.collection("orders");

    await carts.insertOne(order);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

module.exports = {
  getCartByUser,
  addOrder,
};
