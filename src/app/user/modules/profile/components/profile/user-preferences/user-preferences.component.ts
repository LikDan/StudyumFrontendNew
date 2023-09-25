import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SimpleFormConfig } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import {
  UserPreferencesFormConfig, UserPreferencesFormData,
} from '@user/modules/profile/components/profile/user-preferences/user-preferences.dto';
import {
  UserPreferencesService
} from '@user/modules/profile/components/profile/user-preferences/user-preferences.service';

@Component({
  selector: 'user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss'],
  providers: [translatePrefixProvider('preferences')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreferencesComponent {
  private service = inject(UserPreferencesService);

  options = this.service.updateFormOptions

  formConfig: SimpleFormConfig<UserPreferencesFormConfig, UserPreferencesFormData> = {
    elements: {
      theme: {
        type: 'select',
        typeConfig: {
          label: 'theme',
          items: this.service.themes,
        },
        validators: [Validators.required],
      },
      language: {
        type: 'select',
        typeConfig: {
          label: 'language',
          items: this.service.languages,
        },
        validators: [Validators.required],
      },
      timezone: {
        type: 'searchable_select',
        typeConfig: {
          label: 'timezone',
          items: this.service.timezones
        },
        validators: [Validators.required],
      },
    },
    value: this.service.preferences$,
  };

  onSubmit(value: UserPreferencesFormData): void {
    this.service.updatePreferences(value)
  }
}
