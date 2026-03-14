import { PrismaService } from '../prismaModule/prisma.service';
import { Injectable } from '@nestjs/common';
import { IdentifyUserDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const fingerBuffer = Buffer.from(registerDto.fingerHex, 'hex');
    const enrollFinger = await this.prisma.user.create({
      data: {
        uniqueId: registerDto.uniqueId,
        fingerHex: fingerBuffer,
      },
    });

    return enrollFinger.uniqueId;
  }

  async identify(identifyUserDto: IdentifyUserDto) {
    const { fingerHex } = identifyUserDto;
    const fingerBuffer = Buffer.from(fingerHex, 'hex');
    const identifyUser = await this.prisma.user.findUnique({
      where: {
        fingerHex: fingerBuffer,
      },
    });
    return identifyUser;
  }
}
