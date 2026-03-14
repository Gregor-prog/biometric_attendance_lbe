import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import type { CreateAttendanceDto } from './dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('create')
  createAttendance(@Body() dto: CreateAttendanceDto) {
    return this.attendanceService.createAttendance(dto.userId);
  }

  @Get('get/:userId')
  getAttendance(@Param('userId') userId: string) {
    return this.attendanceService.getAttendance(userId);
  }
}
