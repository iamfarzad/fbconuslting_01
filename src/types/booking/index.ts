export interface BookingSlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface BookingDetails {
  name: string;
  email: string;
  company?: string;
  message?: string;
  service?: string;
  date: Date;
  startTime: string;
  endTime: string;
}

export type CalendarView = 'month' | 'week' | 'day';

export interface DateSelectInfo {
  start: Date;
  end: Date;
  startStr: string;
  endStr: string;
  allDay: boolean;
}
