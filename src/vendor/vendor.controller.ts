import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateVendorDto } from './dto';
import { VendorService } from './vendor.services';
import { LoginVendorDto } from './dto/login-vendor.dto';

@ApiTags('Vendor')
@Controller('vendor')
export class VendorController {
  constructor(private vendorService: VendorService) {}

  @Post('register')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a new vendor' })
  @ApiResponse({
    status: 201,
    description: 'Vendor registered successfully',
    schema: {
      example: {
        id: '507f1f77bcf86cd799439011',
        email: 'vendor@example.com',
        name: 'My Vendor',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  async register(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.register(createVendorDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login vendor' })
  @ApiResponse({
    status: 200,
    description: 'Vendor logged in successfully',
    schema: {
      example: {
        id: '507f1f77bcf86cd799439011',
        email: 'vendor@example.com',
        name: 'My Vendor',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  async login(@Body() loginVendorDto: LoginVendorDto) {
    return this.vendorService.login(loginVendorDto);
  }
}
