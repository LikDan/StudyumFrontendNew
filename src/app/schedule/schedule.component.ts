import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { SchedulePlugComponent } from '@schedule/components/schedule-plug/schedule-plug.component';
import { ScheduleService } from '@schedule/services/schedule.service';
import { ActivatedRoute } from '@angular/router';
import { GetScheduleDTO } from '@schedule/entities/schedule.dto';
import { StudyPlacesService } from '@shared/services/study-places.service';
import { Schedule } from '@schedule/entities/schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit, OnDestroy {
  schedule$!: Observable<Schedule>;

  plugType = signal<'loading' | 'error' | 'empty' | null>(null);

  protected readonly SchedulePlugComponent = SchedulePlugComponent;

  private navigateSubscription: Subscription | null = null;
  private service = inject(ScheduleService);
  private route = inject(ActivatedRoute);
  private studyPlaceService = inject(StudyPlacesService);

  ngOnInit(): void {
    this.schedule$ = this.route.params
      .pipe(tap(() => this.plugType.set('loading')))
      .pipe(map(this.parseParams.bind(this)))
      .pipe(switchMap(p => this.service.getSchedule(p)))
      .pipe(tap({
        next: s => s.lessons ? this.plugType.set(null) : this.plugType.set('empty'),
        error: () => this.plugType.set('error'),
      }))
  }

  ngOnDestroy(): void {
    this.navigateSubscription?.unsubscribe();
  }

  private parseParams(): GetScheduleDTO {
    const type = this.route.snapshot.params['type'];
    const typename = this.route.snapshot.params['typename'];
    const studyPlaceID = this.studyPlaceService.currentID;
    if (!type || !typename) return {};

    return {
      type: type,
      typename: typename,
      studyPlaceID: studyPlaceID,
    };
  }
}
