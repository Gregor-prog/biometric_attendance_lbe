import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import type { IdentifyUserDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() dto: RegisterDto) {
    try {
      const { uniqueId, fingerHex } = dto;
      if (!uniqueId || uniqueId.trim() === '') {
        throw new Error('Unique ID is required');
      }
      if (!fingerHex || fingerHex.trim() === '') {
        throw new Error('Finger Hex is required');
      }
      const uniqueIdSuccess = this.authService.register(dto);
      return {
        status: HttpStatus.OK,
        message: 'User registered successfully',
        data: uniqueIdSuccess,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
        };
      }
    }
  }

  @Post('identify')
  identify(@Body() dto: IdentifyUserDto) {
    try {
      const { fingerHex } = dto;
      if (!fingerHex || fingerHex.trim() === '') {
        throw new Error('Finger Hex is required');
      }
      const identifySuccess = this.authService.identify(dto);
      return {
        status: HttpStatus.OK,
        message: 'User identified successfully',
        data: identifySuccess,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
        };
      }
    }
  }
}
