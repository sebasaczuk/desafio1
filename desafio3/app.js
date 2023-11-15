const express = require("express");
const ProductManager = require("../desafio3/js/class.productManager"); // Ruta al archivo de la clase ProductManager

const app = express();

const productManager = new ProductManager("../desafio3/js/data.json"); // Instancia de ProductManager con la ruta del archivo

app.get("/products", (req, res) => {
  const limit = parseInt(req.query.limit); // Obtengo el parámetro de limite en caso que exista

  let productsToSend = productManager.getProducts(); // Obtener todos los productos por defecto

  if (!isNaN(limit)) {
    productsToSend = productsToSend.slice(0, limit); // Si hay un límite, obtener la cantidad solicitada
  }

  res.json({ products: productsToSend }); // Mando los productos como respuesta en formato JSON
});

const PORT = 3000; // Puerto en el que escucha el server
app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
