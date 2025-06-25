import { Product } from './product.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<Product> {
    return this.productModel.create({ title, description, price });
  }

  async getProducts(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async getSingleProduct(productId: number): Promise<Product | null> {
    return this.productModel.findByPk(productId);
  }

  async updateProduct(productId: number, updatedProduct: Omit<Product, 'id'>) {
    return this.productModel.update(updatedProduct, {
      where: { id: productId },
      returning: true,
    });
  }

  async deleteProduct(productId: number) {
    const product = await this.productModel.findByPk(productId);
    if (product) {
      await product.destroy();
    }

    throw new NotFoundException();
  }
}
