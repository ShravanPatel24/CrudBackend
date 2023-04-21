import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { CartService } from 'src/cart/cart.service';
import { Product } from './product.interface';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
  ) {}

  @Post()
  create(@Body() product: Product) {
    this.productsService.create(product);
  }

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this;
  }

  @Get('by-price-range')
  getByPriceRange(
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
  ) {
    return this.productsService.getByPriceRange(
      Number(minPrice),
      Number(maxPrice),
    );
  }

  @Post('cart')
  addToCart(
    @Body() { productId, quantity }: { productId: number; quantity: number },
  ) {
    this.cartService.add(productId, quantity);
  }

  @Get('cart')
  getCart() {
    return this.cartService.getAll();
  }

  @Delete('cart/:productId')
  deleteFromCart(@Param('productId') productId: string) {
    this.cartService.deleteByProductId(Number(productId));
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    this.productsService.deleteById(Number(id));
  }
}
