const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { canMakeNewPurchase, purchaseDateIsIncorrect } = require("./helpers");
const { getCartByUser, addOrder } = require("./database");

const app = express();
const port = 5000;

app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(cors());

app.get("/api/customer/:document/cart", async (req, res) => {
  const document = req.params.document;
  const cart = await getCartByUser(document);
  res.json(cart);
});

app.post("/api/customer/:document/checkout", (req, res) => {
  const newOrderDate = req.body.created_at;
  const document = req.body.document;

  if (purchaseDateIsIncorrect(newOrderDate)) {
    return res.status(403).send({
      message:
        "Data da compra não pode ser maior ou menor do que a data atual.",
    });
  }

  if (!canMakeNewPurchase(document, newOrderDate)) {
    return res.status(403).send({ message: "Limite de compras excedido." });
  }

  addOrder(req.body);
  res.status(201).send({ message: "Compra realizada com sucesso." });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
