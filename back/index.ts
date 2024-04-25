import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
require("dotenv").config();
import { canMakeNewPurchase, purchaseDateIsIncorrect } from "./helpers";
import { getCartByUser, addOrder } from "./database";
import Joi from "joi";

const app = express();
const port = 5000;

app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(cors());

const schema = Joi.object({
  created_at: Joi.string().required(),
  document: Joi.string().required(),
  products: Joi.array().items(
    Joi.object({
      description: Joi.string().required(),
      image_url: Joi.string().required(),
      price: Joi.number().required(),
      price_without_discount: Joi.number().allow(null),
    }),
  ),
  payment: Joi.object({
    card_holder_name: Joi.string().required(),
    card_number: Joi.string().required(),
    card_valid_until: Joi.string().required(),
    cvv: Joi.string().required(),
  }),
  payment_plan: Joi.object({
    total: Joi.number().required(),
    shipping: Joi.number().required(),
    discount: Joi.number().required(),
    subtotal: Joi.number().required(),
  }),
});

app.get("/api/customer/:document/cart", async (req, res) => {
  const document = req.params.document;
  const cart = await getCartByUser(document);
  res.json(cart);
});

app.post("/api/customer/:document/checkout", async (req, res) => {
  const { error } = schema.validate(req.body);

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
  const canUserMakeNewPurchase = await canMakeNewPurchase(
    document,
    newOrderDate,
  );
  if (canUserMakeNewPurchase) {
    addOrder(req.body);
    res.status(201).send({ message: "Compra realizada com sucesso." });
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
