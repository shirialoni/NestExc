import { Module } from '@nestjs/common';
import { Product } from './product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [SequelizeModule],
})
export class ProductModule {}
