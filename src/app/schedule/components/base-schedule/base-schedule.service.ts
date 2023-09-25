import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Lesson } from '@schedule/entities/schedule';

@Injectable({
  providedIn: 'root',
})
export class BaseScheduleService {
  getCellTimeYPosition(isoTime: string, offset: number = 0): number {
    const date = DateTime.fromISO(isoTime);
    return this.getDateY(date) - offset;
  }

  getCellY(value: Lesson[]): number {
    return this.getDateY(value[0].startDate);
  }

  getCellX(value: Lesson[], start: DateTime): number {
    return this.getDateX(value[0].startDate, start);
  }

  getCellHeight(value: Lesson[]): number {
    return this.getDateY(value[0].endDate) - this.getDateY(value[0].startDate);
  }

  private getDateY(date: DateTime): number {
    return (date.hour * 60 + date.minute) * 2.25;
  }

  private getDateX(date: DateTime, start: DateTime): number {
    return Math.floor(date.diff(start, 'day').days) + 1;
  }
}
