const fs = require("fs"); // Módulo de sistema de archivos

class ProductManager {
  constructor(filePath) {
    this.path = "data.json"; // Ruta del archivo que contendrá los productos
    this.products = this.loadProducts(); // Cargar productos desde el archivo
    this.nextId = this.calculateNextId(); // Calcular el próximo ID disponible
  }

  // Método para agregar un producto al archivo
  addProduct(product) {
    if (this.validateProduct(product)) {
      product.id = this.nextId++; // Asignar un ID autoincrementable
      this.products.push(product); // Agregar el producto al arreglo de productos
      this.saveProducts(); // Guardar los productos en el archivo
    }
  }

  // Método para actualizar un producto en el archivo
  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id); // Buscar el índice del producto con el ID proporcionado
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct }; // Actualizar el producto
      this.saveProducts(); // Guardar los productos actualizados en el archivo
    } else {
      console.log("Product not found.");
    }
  }

  // Método para eliminar un producto del archivo
  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id); // Buscar el índice del producto con el ID proporcionado
    if (index !== -1) {
      this.products.splice(index, 1); // Eliminar el producto del arreglo
      this.saveProducts(); // Guardar los productos sin el producto eliminado en el archivo
    } else {
      console.log("Product not found.");
    }
  }

  // Método para cargar productos desde el archivo
  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8"); // Leer datos desde el archivo
      return JSON.parse(data); // Convertir los datos a un arreglo de productos
    } catch (error) {
      return []; // Si ocurre un error al cargar el archivo, devolver un arreglo vacío
    }
  }

  // Método para guardar productos en el archivo
  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2)); // Guardar los productos como JSON en el archivo
  }

  // Método para calcular el próximo ID disponible
  calculateNextId() {
    const maxId = this.products.reduce(
      (max, product) => (product.id > max ? product.id : max),
      0
    );
    return maxId + 1; // El próximo ID será el máximo existente + 1
  }

  // Método para validar un producto antes de agregarlo
  validateProduct(product) {
    if (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.stock
    ) {
      const isIdUnique = this.products.every((p) => p.id !== product.id); // Validar que el ID sea único
      if (isIdUnique) {
        return true; // Producto válido
      } else {
        console.log("ID already exists."); // Mensaje de error si el ID ya existe
        return false;
      }
    } else {
      console.log("All fields are mandatory."); // Mensaje de error si faltan campos obligatorios
      return false;
    }
  }
}

module.exports = ProductManager; // Exportar la clase para su uso en otros archivos
