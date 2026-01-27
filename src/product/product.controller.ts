import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto, ProductFilterDto } from './dto';
import { JwtAuthGuard } from 'src/common/guards';
import { CurrentVendor } from 'src/common/decorators';

@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new product (vendor-scoped)' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439012',
        name: 'Product Name',
        description: 'Product Description',
        price: 99.99,
        category: 'Electronics',
        vendorId: '507f1f77bcf86cd799439011',
        isDeleted: false,
        createdAt: '2024-01-26T10:00:00.000Z',
        updatedAt: '2024-01-26T10:00:00.000Z',
      },
    },
  })
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentVendor() vendor: any,
  ) {
    return this.productService.create(vendor.vendorId, createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products for vendor (paginated)' })
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully',
    schema: {
      example: {
        products: [
          {
            _id: '507f1f77bcf86cd799439012',
            name: 'Product Name',
            price: 99.99,
            category: 'Electronics',
            vendorId: '507f1f77bcf86cd799439011',
          },
        ],
        total: 1,
        page: 1,
        limit: 10,
        pages: 1,
      },
    },
  })
  async getAll(
    @Query() filter: ProductFilterDto,
    @CurrentVendor() vendor: any,
  ) {
    const { products, total } = await this.productService.getAll(
      vendor.vendorId,
      filter,
    );

    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const pages = Math.ceil(total / limit);

    return {
      products,
      total,
      page,
      limit,
      pages,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID (vendor-scoped)' })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved successfully',
  })
  async getById(@Param('id') id: string, @CurrentVendor() vendor: any) {
    return this.productService.getById(id, vendor.vendorId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product (vendor-scoped)' })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentVendor() vendor: any,
  ) {
    return this.productService.update(id, vendor.vendorId, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Soft delete product (vendor-scoped)' })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
    schema: {
      example: {
        message: 'Product deleted successfully',
      },
    },
  })
  async delete(@Param('id') id: string, @CurrentVendor() vendor: any) {
    return this.productService.softDelete(id, vendor.vendorId);
  }
}
