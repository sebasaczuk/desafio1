class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1; // Inicializar el ID en 1
  }

  addProduct(product) {
    if (this.validateProduct(product)) {
      product.id = this.nextId++; // Asignar un ID autoincrementable
      this.products.push(product);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("Not found");
      return null;
    }
  }

  validateProduct(product) {
    // Validar que todos los campos sean obligatorios
    if (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.stock
    ) {
      // Validar que el "id-code" no se repita
      const isIdUnique = this.products.every((p) => p.id !== product.id);
      if (isIdUnique) {
        return true;
      } else {
        console.log("ID already exists.");
        return false;
      }
    } else {
      console.log("All fields are mandatory.");
      return false;
    }
  }
}

// Ejemplo de uso:
// const productManager = new ProductManager();

//const product1 = {
//  title: "Product 1",
//  description: "Description 1",
//  price: 10.99,
//  thumbnail: "thumbnail1.jpg",
//  stock: 100,
//};

// productManager.addProduct(product1);

//console.log(productManager.getProducts()); // Obtener la lista de productos
//console.log(productManager.getProductById(1)); // Buscar producto por ID
//console.log(productManager.getProductById(3)); // Intentar buscar un producto inexistente
