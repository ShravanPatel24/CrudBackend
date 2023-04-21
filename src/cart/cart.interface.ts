import { Product } from 'src/products/product.interface';

export interface Cart {
  productId: number;
  quantity: number;
  product?: Product;
}
