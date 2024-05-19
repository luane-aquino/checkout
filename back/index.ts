import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
require("dotenv").config();
import { canMakeNewPurchase, purchaseDateIsIncorrect } from "./helpers";
import { getCartByUser, addOrder } from "./database";
import { orderSchema } from "./models/order";

const app = express();
const port = 5000;
const corsOptions = { origin: "https://checkout-front-gray.vercel.app" };

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/api/customer/:document/cart", async (req, res) => {
  const document = req.params.document;
  const cart = await getCartByUser(document);
  console.log("***[back-cart]", cart);
  res?.json(cart);
});

app.post("/api/customer/:document/checkout", async (req, res) => {
  const { error } = orderSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const newOrderDate = req.body.created_at;
  const document = req.body.document;

  if (purchaseDateIsIncorrect(newOrderDate)) {
    return res.status(403).send({
      message:
        "Data da compra não pode ser maior ou menor do que a data atual.",
    });
  }
  const canUserMakeNewPurchase = await canMakeNewPurchase(document);
  if (canUserMakeNewPurchase) {
    try {
      await addOrder(req.body);
      res.status(201).send({ message: "Compra realizada com sucesso" });
    } catch {
      res
        .status(500)
        .send({ message: "Failed to save data due to server error" });
    }
  } else {
    res.status(403).send({
      message:
        "Limite de compras excedido ou ocorreu algum erro ao registrar os dados. Tente novamente mais tarde ou entre em contato com a gente.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
