import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { VendorRepository } from 'src/vendor/vendor.repository';


@Injectable()
export class AuthService { 
  constructor(
    private vendorRepository: VendorRepository,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    // 1️⃣ Check if vendor exists
    const vendor = await this.vendorRepository.findByEmail(email);
    if (!vendor) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2️⃣ Compare password
    const match = await bcrypt.compare(password, vendor.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    // 3️⃣ Return JWT token
    return {
      access_token: this.jwtService.sign({
        sub: vendor._id,       
        email: vendor.email,   
      }),
    };
  }
}
