import { Controller, Get } from '@nestjs/common';
import { TIME_SLOTS, WEEK_DAYS } from '../common/config/week-data';
import { TimeSlotInterface, WeekDayInterface } from '../common/interfaces/time-slot.interface';

@Controller('config')
export class ConfigDataController {
  @Get('time-slots')
  async findAll(): Promise<TimeSlotInterface[]> {
    return TIME_SLOTS;
  }

  @Get('week-days')
  async weekDays(): Promise<WeekDayInterface[]> {
    return WEEK_DAYS.map((day: WeekDayInterface) => {
      day.date = (new Date()).toDateString();
      return day;
    });
  }
}
