import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartItemModel: Model<CartDocument>,
  ) {}

  async addToCart(cartItem: Cart): Promise<void> {
    const existingCartItem = await this.cartItemModel.findOne({
      productId: cartItem.productId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += cartItem.quantity;
      await existingCartItem.save();
    } else {
      const createdCartItem = new this.cartItemModel(cartItem);
      await createdCartItem.save();
    }
  }

  async getCartItems(): Promise<Cart[]> {
    return this.cartItemModel.find().exec();
  }
}
