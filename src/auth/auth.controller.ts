import { Body, Controller, HttpStatus, Post, BadRequestException } from '@nestjs/common';
import type { IdentifyUserDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const { uniqueId, fingerHex } = dto;
    if (!uniqueId || uniqueId.trim() === '') {
      throw new BadRequestException('Unique ID is required');
    }
    if (!fingerHex || fingerHex.trim() === '') {
      throw new BadRequestException('Finger Hex is required');
    }
    const uniqueIdSuccess = await this.authService.register(dto);
    return {
      status: HttpStatus.OK,
      message: 'User registered successfully',
      data: uniqueIdSuccess,
    };
  }

  @Post('identify')
  async identify(@Body() dto: IdentifyUserDto) {
    const { fingerHex } = dto;
    if (!fingerHex || fingerHex.trim() === '') {
      throw new BadRequestException('Finger Hex is required');
    }
    const identifySuccess = await this.authService.identify(dto);
    return {
      status: HttpStatus.OK,
      message: 'User identified successfully',
      data: identifySuccess,
    };
  }
}
