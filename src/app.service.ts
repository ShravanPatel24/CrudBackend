import { Injectable } from '@nestjs/common';
import { Product } from './products/product.interface';
import { Cart } from './cart/cart.interface';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private cart: Cart[] = [];

  // Method to create a new product
  createProduct(product: Product) {
    this.products.push(product);
    return product;
  }

  // Method to add a product to the cart
  addToCart(cartItem: Cart) {
    const existingItem = this.cart.find(
      (item) => item.product.id === cartItem.product.id,
    );
    if (existingItem) {
      existingItem.quantity += cartItem.quantity;
    } else {
      this.cart.push(cartItem);
    }
    return this.cart;
  }

  // Method to delete a product by ID
  deleteProduct(id: string) {
    const parsedId = parseInt(id, 10); // convert id to a number using parseInt()
    this.products = this.products.filter((product) => product.id !== parsedId);
    return this.products;
  }

  // Method to get all cart items
  getCartItems() {
    return this.cart;
  }

  // Method to get products within a price range
  getProductsByPriceRange(minPrice: number, maxPrice: number) {
    return this.products.filter(
      (product) =>
        Number(product.price) >= Number(minPrice) &&
        Number(product.price) <= Number(maxPrice),
    );
  }
}
