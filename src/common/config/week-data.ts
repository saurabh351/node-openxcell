import { TimeSlotInterface, WeekDayInterface } from '../interfaces/time-slot.interface';

export const WEEK_DAYS: WeekDayInterface[] = [
  {
    id : 1,
    day : 'Monday',
  },
  {
    id : 2,
    day : 'Tuesday'
  },
  {
    id : 3,
    day : 'Wednesday'
  },
  {
    id : 4,
    day : 'Thursday'
  },
  {
    id : 5,
    day : 'Friday'
  }
];

export const TIME_SLOTS: TimeSlotInterface[] = [
  {
    id: 1,
    fromTime: '10:00',
    toTime: '11:00',
  },
  {
    id: 2,
    fromTime: '11:00',
    toTime: '12:00',
  },
  {
    id: 3,
    fromTime: '12:00',
    toTime: '01:00',
  },
  {
    id: 4,
    fromTime: '01:00',
    toTime: '02:00',
  },
  {
    id: 5,
    fromTime: '02:00',
    toTime: '03:00',
  },
  {
    id: 6,
    fromTime: '03:00',
    toTime: '04:00',
  },
];
