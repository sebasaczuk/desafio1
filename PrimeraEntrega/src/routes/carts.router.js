import express from "express";
import Cart from "../../class/Cart/Cart.js";
import CartManager from "../../class/Cart/CartManager.js";
import FileManager from "../../class/FileSystem/FileManager.js";
const cartsRouter = express.Router();

// Array para almacenar mascotas
const products = [];

//const farchivo = new FileManager('carrito.json', 'C:/Proyectos/Coder/04-PrimeraEntrega/files');
const farchivo = new FileManager(
  "carrito.json",
  "E:/Users/Sebastian/Documents/_CursoBackend/Desafios/PrimeraEntrega/files"
);

const listaAux = [];

// crea Instancia del Cart Manager y setea el nombre del Archivo, el Origen de datos y la ruta
const lc = new CartManager(farchivo);
console.log("Se crea el Cart Manager");

cartsRouter.get("/", (req, res) => {
  lc.getCarts()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

cartsRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  lc.getCartsById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

cartsRouter.post("/", (req, res) => {
  const newCart = new Cart(req.body);
  lc.addCart(newCart);
  res.status(201).json("Producto agregado!");
});

cartsRouter.post("/:cid/product/:pid", (req, res) => {
  if (req.params.cid ?? req.params.pid) {
    const id = parseInt(req.params.cid, 10);
    const codProd = parseInt(req.params.pid, 10);
    lc.addProductCart(codProd, id);
    res.status(201).json({
      message: `Carrito con ID ${id} Modificado. Se modificó la cantidad del Producto con ID ${codProd}`,
    });
  } else {
    res.status(201).json("Parámetros inválidos");
  }
});

cartsRouter.put("/", (req, res) => {
  if (req.query.id ?? req.query.codProd) {
    const id = parseInt(req.query.id, 10);
    const codProd = parseInt(req.query.codProd, 10);
    lc.addProductCart(codProd, id);
    res.status(201).json("Producto actualizado");
  } else {
    res.status(201).json("Parámetros inválidos");
  }
});

export { cartsRouter };
