import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { Cart, CartDocument } from '../cart/cart.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>, // inject CartModel
  ) {}

  async createProduct(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }

  async addToCart(cartItem: Cart): Promise<Cart> {
    const newCartItem = new this.cartModel(cartItem);
    return await newCartItem.save();
  }

  async deleteProduct(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }

  async getCartItems(): Promise<Cart[]> {
    return await this.cartModel.find();
  }

  async getProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async getProductsByPriceRange(
    minPrice: number,
    maxPrice: number,
  ): Promise<Product[]> {
    return await this.productModel.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
  }
}
