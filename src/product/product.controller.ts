import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Endpoint to create a new product
  @Post()
  async createProduct(@Body() product: Product) {
    return this.productService.createProduct(product);
  }

  // Endpoint to delete a product by ID
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  // Endpoint to get all products
  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  // Endpoint to get products within a price range
  @Get(':minPrice/:maxPrice')
  async getProductsByPriceRange(
    @Param('minPrice') minPrice: number,
    @Param('maxPrice') maxPrice: number,
  ) {
    return this.productService.getProductsByPriceRange(minPrice, maxPrice);
  }
}
