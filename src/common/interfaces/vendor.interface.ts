import { Document } from 'mongoose';

export interface IVendor extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
