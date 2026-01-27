import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IProduct } from '../common/interfaces';
import { CreateProductDto, UpdateProductDto, ProductFilterDto } from './dto';

@Injectable()
export class ProductRepository {
  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}

  async create(vendorId: string, createProductDto: CreateProductDto): Promise<IProduct> {
    const product = new this.productModel({
      ...createProductDto,
      vendorId: new Types.ObjectId(vendorId),
    });
    return product.save();
  }

  async findById(productId: string, vendorId: string): Promise<IProduct | null> {
    return this.productModel
      .findOne({
        _id: new Types.ObjectId(productId),
        vendorId: new Types.ObjectId(vendorId),
        isDeleted: false,
      } as any)
      .lean();
  }

  async findByIdWithoutVendorCheck(productId: string): Promise<IProduct | null> {
    return this.productModel.findById(productId).lean();
  }

  async findAll(
  vendorId: string,
  filter: ProductFilterDto,
): Promise<{ products: IProduct[]; total: number }> {
  const page = Number(filter.page) || 1;
  const limit = Number(filter.limit) || 10;
  const skip = (page - 1) * limit;

  const query: any = {
    vendorId: new Types.ObjectId(vendorId),
    isDeleted: false,
  };

  // Price filters
  if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
    query.price = {};
    if (filter.minPrice !== undefined) query.price.$gte = Number(filter.minPrice);
    if (filter.maxPrice !== undefined) query.price.$lte = Number(filter.maxPrice);
  }

  // Category filter (case-insensitive)
  if (filter.category) {
    query.category = { $regex: new RegExp(`^${filter.category}$`, 'i') };
  }

  const [products, total] = await Promise.all([
    this.productModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
    this.productModel.countDocuments(query),
  ]);

  return { 
    products, 
    total 
  };
}

  async update(
    productId: string,
    vendorId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct | null> {
    return this.productModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(productId),
        vendorId: new Types.ObjectId(vendorId),
        isDeleted: false,
      } as any,
      updateProductDto,
      { new: true },
    );
  }

  async softDelete(productId: string, vendorId: string): Promise<IProduct | null> {
    return this.productModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(productId),
        vendorId: new Types.ObjectId(vendorId),
        isDeleted: false,
      } as any,
      { isDeleted: true },
      { new: true },
    );
  }
}
