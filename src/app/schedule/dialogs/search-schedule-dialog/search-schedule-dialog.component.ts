import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultFormComponent } from '@ui/forms/default-form/default-form.component';
import { SimpleFormConfig } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import {
  SearchScheduleFormConfig,
  SearchScheduleFormData,
} from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.dto';
import { SearchScheduleDialogService } from '@schedule/dialogs/search-schedule-dialog/search-schedule-dialog.service';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-schedule-dialog',
  standalone: true,
  imports: [CommonModule, DefaultFormComponent],
  templateUrl: './search-schedule-dialog.component.html',
  styleUrls: ['./search-schedule-dialog.component.scss'],
  providers: [translatePrefixProvider('search')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchScheduleDialogComponent {
  private dialog = inject(MatDialogRef);
  private service = inject(SearchScheduleDialogService);
  private config = inject<SearchScheduleFormData>(MAT_DIALOG_DATA);
  formConfig: SimpleFormConfig<SearchScheduleFormConfig> = {
    elements: {
      studyPlaceID: {
        type: 'searchable_select',
        typeConfig: {
          label: 'studyPlace',
          items: this.service.studyPlaceList$,
        },
        initial: this.config.studyPlaceID!,
        validators: [Validators.required],
      },
      type: {
        type: 'select',
        typeConfig: {
          label: 'type',
          items: ['group', 'teacher', 'subject', 'room'],
        },
        initial: this.config.type!,
        validators: [Validators.required],
      },
      typename: {
        type: 'autocomplete_text',
        typeConfig: {
          dependsOn: 'type',
          label: 'typename',
          dependsItems: item => this.service.getTypeNames(item),
        },
        initial: this.config.typename!,
        validators: [Validators.required],
      },
    },
  };

  onSubmit(data: SearchScheduleFormData): void {
    this.dialog.close(data);
  }
}
