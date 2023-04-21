import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/product.interface';
import { ProductsService } from 'src/products/product.service';
import { Cart } from './cart.interface';

@Injectable()
export class CartService {
  private items: Cart[] = [];

  constructor(private readonly productsService: ProductsService) {}

  add(productId: number, quantity: number) {
    const product = this.productsService.getById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    const existingItem = this.items.find(
      (item) => item.productId === productId,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ productId, quantity });
    }
  }

  getAll() {
    return this.items.map((item) => {
      const product = this.productsService.getById(item.productId);
      return {
        product,
        quantity: item.quantity,
      };
    });
  }

  deleteByProductId(productId: number) {
    const index = this.items.findIndex((item) => item.productId === productId);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
