import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto, ProductFilterDto } from './dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(vendorId: string, createProductDto: CreateProductDto) {
    return this.productRepository.create(vendorId, createProductDto);
  }

  async getAll(vendorId: string, filter: ProductFilterDto) {
    return this.productRepository.findAll(vendorId, filter);
  }

  async getById(productId: string, vendorId: string) {
    const product = await this.productRepository.findById(productId, vendorId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(productId: string, vendorId: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findById(productId, vendorId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updated = await this.productRepository.update(
      productId,
      vendorId,
      updateProductDto,
    );

    return updated;
  }

  async softDelete(productId: string, vendorId: string) {
    const product = await this.productRepository.findById(productId, vendorId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.softDelete(productId, vendorId);
    return { message: 'Product deleted successfully' };
  }
}
