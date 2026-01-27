import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { VendorRepository } from './vendor.repository';
import { CreateVendorDto, LoginVendorDto } from './dto';

@Injectable()
export class VendorService {
  constructor(
    private vendorRepository: VendorRepository,
    private jwtService: JwtService,
  ) {}

  async register(createVendorDto: CreateVendorDto) {
    const existingVendor = await this.vendorRepository.findByEmail(
      createVendorDto.email,
    );

    if (existingVendor) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createVendorDto.password, 10);
    const vendor = await this.vendorRepository.create({
      ...createVendorDto,
      password: hashedPassword,
    });

    return {
      id: vendor._id,
      email: vendor.email,
      name: vendor.name,
      token: this.jwtService.sign({ sub: vendor._id, email: vendor.email }),
    };
  }

  async login(loginVendorDto: LoginVendorDto) {
    const vendor = await this.vendorRepository.findByEmail(
      loginVendorDto.email,
    );

    if (!vendor) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginVendorDto.password,
      vendor.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: vendor._id,
      email: vendor.email,
      name: vendor.name,
      token: this.jwtService.sign({ sub: vendor._id, email: vendor.email }),
    };
  }

  async findById(id: string) {
    return this.vendorRepository.findById(id);
  }
}
