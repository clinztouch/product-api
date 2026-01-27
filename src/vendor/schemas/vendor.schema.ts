import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Vendor extends Document {
  @Prop({ unique: true })
  name: string;

@Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true})
  password: string;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
