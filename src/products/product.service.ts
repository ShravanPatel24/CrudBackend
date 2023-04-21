import { Injectable } from '@nestjs/common';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(product: Product) {
    this.products.push(product);
  }

  getAll() {
    return this.products;
  }

  getById(id: number) {
    return this.products.find((product) => product.id === id);
  }

  getByPriceRange(minPrice: number, maxPrice: number) {
    return this.products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );
  }

  deleteById(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }
}
