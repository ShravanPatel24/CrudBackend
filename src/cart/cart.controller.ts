import { Controller, Get, Post, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './cart.schema';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Endpoint to add a product to the cart
  @Post()
  async addToCart(@Body() cartItem: Cart) {
    return this.cartService.addToCart(cartItem);
  }

  // Endpoint to get all cart items
  @Get()
  async getCartItems() {
    return this.cartService.getCartItems();
  }
}
