import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from '../product/product.schema';
import { CartModule } from '../cart/cart.module';
import { Cart, CartSchema } from '../cart/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Cart.name, schema: CartSchema },
    ]),
    CartModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
