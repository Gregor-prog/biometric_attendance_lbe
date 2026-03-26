import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import type { CreateAttendanceDto } from './dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('clock-in')
  createAttendance(@Body() dto: CreateAttendanceDto) {
    return this.attendanceService.createAttendance(dto.fingerHex);
  }

  @Get('get/:uniqueId')
  getAttendance(@Param('uniqueId') uniqueId: string) {
    return this.attendanceService.getAttendance(uniqueId);
  }
}
