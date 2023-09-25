import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Schedule, ScheduleSchema } from '@schedule/entities/schedule';
import { HttpClient } from '@angular/common/http';
import { validate } from '@shared/rxjs/pipes/validate';
import { GetScheduleDTO } from '@schedule/entities/schedule.dto';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { debug } from '@shared/rxjs/pipes/debug.pipe';

export type ScheduleMode = 'time' | 'table'

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  mode: ScheduleMode = 'time';

  private http = inject(HttpClient);
  private _schedule$ = new BehaviorSubject<Schedule | null>(null);

  get schedule(): Schedule | null {
    return this._schedule$.value;
  };

  get schedule$(): Observable<Schedule> {
    return this._schedule$.pipe(filterNotNull());
  };

  getSchedule(dto: GetScheduleDTO): Observable<Schedule> {
    return this.http.get<Schedule>('api/v1/schedule', { params: dto })
      .pipe(validate(ScheduleSchema))
      .pipe(tap(s => this._schedule$.next(s)))
  }
}
