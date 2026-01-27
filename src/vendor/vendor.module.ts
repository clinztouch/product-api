  import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorController } from './vendor.controller';
import { VendorSchema } from './schemas/vendor.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { VendorService } from './vendor.services';
import { VendorRepository } from './vendor.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vendor', schema: VendorSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
      }),
    }),
  ],
  controllers: [VendorController],
  providers: [VendorService, VendorRepository],
  exports: [VendorService],
})
export class VendorModule {}
