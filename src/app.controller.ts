import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductService } from './app.service';
import { Product } from './products/product.interface';
import { Cart } from './cart/cart.interface';

@Controller()
export class AppController {
  constructor(private readonly productService: ProductService) {}

  // Endpoint to create a new product
  @Post('/products')
  async createProduct(@Body() product: Product) {
    return this.productService.createProduct(product);
  }

  // Endpoint to add a product to the cart
  @Post('/cart')
  async addToCart(@Body() cartItem: Cart) {
    return this.productService.addToCart(cartItem);
  }

  // Endpoint to delete a product by ID
  @Delete('/products/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  // Endpoint to get all cart items
  @Get('/cart')
  async getCartItems() {
    return this.productService.getCartItems();
  }

  // Endpoint to get products within a price range
  @Get('/products/:minPrice/:maxPrice')
  async getProductsByPriceRange(
    @Param('minPrice') minPrice: number,
    @Param('maxPrice') maxPrice: number,
  ) {
    return this.productService.getProductsByPriceRange(minPrice, maxPrice);
  }
}
