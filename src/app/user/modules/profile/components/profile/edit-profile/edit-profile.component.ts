import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { SimpleFormConfig } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import { EditProfileFormConfig } from '@user/modules/profile/components/profile/edit-profile/edit-profile.dto';
import { EditProfileService } from '@user/modules/profile/components/profile/edit-profile/edit-profile.service';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [translatePrefixProvider('edit')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent {
  private service = inject(EditProfileService);

  formConfig: SimpleFormConfig<EditProfileFormConfig> = {
    elements: {
      login: {
        type: 'text',
        typeConfig: {
          label: 'login',
        },
        validators: [Validators.required],
      },
      email: {
        type: 'text',
        typeConfig: {
          label: 'email',
        },
        validators: [Validators.required, Validators.email],
      },
      password: {
        type: 'password',
        typeConfig: {
          label: 'password',
        },
        validators: [Validators.minLength(8)],
      },
      passwordConfirm: {
        type: 'password',
        typeConfig: {
          label: 'passwordConfirm',
        },
        validators: [Validators.minLength(8)],
      },
    },
    value: this.service.currentProfile$,
  };

  options: SubmitOptions = this.service.updateFormOptions;
}
