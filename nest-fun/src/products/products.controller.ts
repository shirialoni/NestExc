import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = (
      await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice)
    ).id;
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: number) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: number,
    @Body('product') updatedProduct: Omit<Product, 'id'>,
  ) {
    this.productsService.updateProduct(prodId, updatedProduct);
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: number) {
    try {
      this.productsService.deleteProduct(prodId);
    } catch (NotFoundException) {
      return `product with id : ${prodId} was not found`;
    }
  }
}
