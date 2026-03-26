import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prismaModule/prisma.service';
import type { IdentifyUserDto, RegisterDto } from './dto';

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
    const fingerBuffer = Buffer.from(identifyUserDto.fingerHex, 'hex');
    const user = await this.prisma.user.findUnique({
      where: { fingerHex: fingerBuffer },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getAllTemplates() {
    const users = await this.prisma.user.findMany({
      select: { uniqueId: true, fingerHex: true },
    });
    // Return fingerHex as hex string so hardware can use it directly
    return users.map((u) => ({
      uniqueId: u.uniqueId,
      fingerHex: Buffer.from(u.fingerHex).toString('hex'),
    }));
  }
}
