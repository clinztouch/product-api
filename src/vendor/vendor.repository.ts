import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IVendor } from '../common/interfaces';
import { CreateVendorDto } from './dto';

@Injectable()
export class VendorRepository {
  constructor(@InjectModel('Vendor') private vendorModel: Model<IVendor>) {}

  async create(createVendorDto: CreateVendorDto): Promise<IVendor> {
    const vendor = new this.vendorModel(createVendorDto);
    return vendor.save();
  }

  async findByEmail(email: string): Promise<IVendor | null> {
    return this.vendorModel.findOne({ email: email.toLowerCase() }).lean();
  }

  async findById(id: string): Promise<IVendor | null> {
    return this.vendorModel.findById(id).lean();
  }

  async findAll(): Promise<IVendor[]> {
    return this.vendorModel.find().lean();
  }
}
