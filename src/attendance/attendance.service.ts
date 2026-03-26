import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prismaModule/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async createAttendance(fingerHex: string) {
    const fingerBuffer = Buffer.from(fingerHex, 'hex');
    const user = await this.prisma.user.findUnique({ where: { fingerHex: fingerBuffer } });
    if (!user) throw new NotFoundException('User not found');
    const attendance = await this.prisma.attendance.create({
      data: {
        userId: user.id,
        status: 'PRESENT',
      },
    });
    return attendance;
  }

  async getAttendance(uniqueId: string) {
    const user = await this.prisma.user.findUnique({ where: { uniqueId } });
    if (!user) throw new NotFoundException('User not found');
    return this.prisma.attendance.findMany({
      where: { userId: user.id },
      select: { status: true, clockIn: true },
    });
  }
}
