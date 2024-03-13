const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  canMakeNewPurchase,
  orders,
  purchaseDateIsIncorrect,
} = require("./helpers");

const app = express();
const port = 5000;

app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(cors());

app.get("/api/customer/:document/cart", (req, res) => {
  // console.log('***[param]',req.params.document);
  const data = {
    paymentPlan: {
      total: 624.8,
      shipping: 5.3,
      discount: 30,
      subtotal: 600.1,
    },
    products: [
      {
        description:
          "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução",
        imageUrl:
          "https://www.alboradainfo.com/image/cache/produto/2152/59f985654994860cdfbf736edb4e70b6.jpg",
        price: 225.9,
        oldPrice: 243.9,
      },
      {
        description:
          "Good Girl Carolina Herrera Eau de Parfum - Perfume Feminino 30ml",
        imageUrl:
          "https://epocacosmeticos.vteximg.com.br/arquivos/ids/438948-500-500/good-girl-eau-de-parfum-carolina-herrera-perfume-feminino-30ml.jpg?v=637600522703130000",
        price: 299,
        oldPrice: null,
      },
      {
        description: "Senscience Inner Restore Intensif - Máscara Capilar 50ml",
        imageUrl:
          "https://prohair.vteximg.com.br/arquivos/ids/155822-500-500/2021_MI_SENS_Foto_Producto_Inner-Restore_50ml_Fte.png?v=637965126747670000",
        price: 99.9,
        oldPrice: null,
      },
    ],
  };
  res.json(data);
});

app.post("/api/customer/:document/checkout", (req, res) => {
  // console.log("***[req]", req.body);
  const newOrderDate = req.body.createdAt;
  const document = req.body.document;

  if (purchaseDateIsIncorrect(newOrderDate)) {
    return res
      .status(403)
      .send("Data da compra não pode ser maior ou menor do que a data atual.");
  }

  if (!canMakeNewPurchase(document, newOrderDate)) {
    return res.status(403).send("Limite de compras excedido.");
  }

  orders.push(req.body);
  res.send("Compra realizada com sucesso.");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
