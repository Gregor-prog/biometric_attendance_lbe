import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prismaModule/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async createAttendance(userId: string) {
    const attendance = await this.prisma.attendance.create({
      data: {
        userId,
        status: 'PRESENT',
      },
    });
    return attendance;
  }

  async getAttendance(userId: string) {
    const userAttendance = await this.prisma.attendance.findMany({
      where: {
        userId,
      },
      select: {
        userId: true,
        status: true,
        clockIn: true,
      },
    });
    return userAttendance;
  }
}
