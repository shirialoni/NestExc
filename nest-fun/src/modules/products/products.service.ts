import { error } from 'console';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { CreateProductDto } from './dto/createProduct.dto';
import { Injectable } from '@nestjs/common';
import { NotFoundProductException } from 'src/modules/products/exceptions/notFound.exception';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async insertProduct(newProduct: CreateProductDto): Promise<Product> {
    return this.productModel.create(newProduct);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async getSpecificProduct(productId: number): Promise<Product> {
    const product: Product | null = await this.productModel.findByPk(productId);

    if (product) {
      return product;
    }

    throw new NotFoundProductException(`product with id: ${productId} not found`);
  }

  async updateProduct(
    productId: number,
    updatedProduct: UpdateProductDto,
  ): Promise<void> {
    await this.getSpecificProduct(productId);

    await this.productModel.update(updatedProduct, {
      where: { id: productId },
    });
  }

  async removeProduct(productId: number): Promise<void> {
    const product: Product = await this.getSpecificProduct(productId);

    await product.destroy();
  }
}
