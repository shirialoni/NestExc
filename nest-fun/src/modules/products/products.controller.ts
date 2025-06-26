import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async insertProduct(
    @Body() newProduct: CreateProductDto,
  ): Promise<{ id: number }> {
    try {
      const generatedId: number = (
        await this.productsService.insertProduct(newProduct)
      ).id;

      return { id: generatedId };
    } catch (error) {
      return error.response;
    }
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    try {
      return this.productsService.getAllProducts();
    } catch (error) {
      return error.response;
    }
  }

  @Get(':id')
  async getSpecificProduct(@Param('id') prodId: number): Promise<Product> {
    try {
      return this.productsService.getSpecificProduct(prodId);
    } catch (error) {
      return error.response;
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: number,
    @Body() updatedProduct: UpdateProductDto,
  ): Promise<string> {
    try {
      await this.productsService.updateProduct(prodId, updatedProduct);

      return `product with id : ${prodId} was updated`;
    } catch (error) {
      return error.response;
    }
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: number): Promise<string> {
    try {
      await this.productsService.removeProduct(prodId);

      return `product with id : ${prodId} was deleted`;
    } catch (error) {
      return error.response;
    }
  }
}
