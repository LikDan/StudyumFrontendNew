import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '@schedule/services/schedule.service';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Schedule } from '@schedule/entities/schedule';
import { IconComponent } from '@ui/images/icon.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchScheduleFormData } from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.dto';
import {
  SearchScheduleDialogComponent,
} from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.component';
import { filterNotNull } from '@shared/rxjs/pipes/filterNotNull.pipe';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'schedule-header',
  standalone: true,
  imports: [CommonModule, IconComponent, TranslateModule],
  templateUrl: './schedule-header.component.html',
  styleUrls: ['./schedule-header.component.scss'],
  providers: [translatePrefixProvider('header')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleHeaderComponent implements OnInit, OnDestroy {
  schedule$!: Observable<Schedule>;

  private service = inject(ScheduleService);
  private dialogService = inject(MatDialog);
  private router = inject(Router);

  private navigateSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.schedule$ = this.service.schedule$;
  }

  showSearchDialog(): void {
    if (!this.service.schedule) return;

    const data: SearchScheduleFormData = {
      studyPlaceID: this.service.schedule.info.studyPlaceInfo.id,
      type: this.service.schedule.info.type,
      typename: this.service.schedule.info.typeName,
    };

    this.navigateSubscription = this.dialogService.open(SearchScheduleDialogComponent, { data: data }).afterClosed()
      .pipe(filterNotNull())
      .pipe(switchMap(data => this.router.navigate([`schedule/${data.type}/${data.typename}`], { queryParams: { studyPlaceID: data.studyPlaceID } })))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.navigateSubscription?.unsubscribe()
  }
}
