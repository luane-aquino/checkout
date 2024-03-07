const express = require('express');
var cors = require('cors')

const app = express();
const port = 5000;
app.use(cors())

app.get('/cart', (req, res) => {
  const data = {
    "paymentPlan": {
      "total": 624.8,
      "shipping": 5.3,
      "discount": 30,
      "subtotal": 600.1
    },
    "products": [
      {
        "description": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução",
        "imageUrl": "https://www.alboradainfo.com/image/cache/produto/2152/59f985654994860cdfbf736edb4e70b6.jpg",
        "price": 225.9,
        "oldPrice": 243.9
      },
      {
        "description": "Good Girl Carolina Herrera Eau de Parfum - Perfume Feminino 30ml",
        "imageUrl": "https://epocacosmeticos.vteximg.com.br/arquivos/ids/438948-500-500/good-girl-eau-de-parfum-carolina-herrera-perfume-feminino-30ml.jpg?v=637600522703130000",
        "price": 299,
        "oldPrice": null
      },
      {
        "description": "Senscience Inner Restore Intensif - Máscara Capilar 50ml",
        "imageUrl": "https://prohair.vteximg.com.br/arquivos/ids/155822-500-500/2021_MI_SENS_Foto_Producto_Inner-Restore_50ml_Fte.png?v=637965126747670000",
        "price": 99.9,
        "oldPrice": null
      }
    ]
  }
  res.json(data);
});

app.post('/payment', (req, res) => {
  console.log('***[req]',req);
  res.send('Data received!')
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
