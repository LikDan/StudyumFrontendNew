import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { SimpleFormConfig } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { ResetPasswordDataFormConfig } from '@user/modules/auth/components/reset-password-data/reset-password-data.dto';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';

@Component({
  selector: 'app-reset-password-data',
  templateUrl: './reset-password-data.component.html',
  styleUrls: ['./reset-password-data.component.scss'],
  providers: [translatePrefixProvider('resetPassword.data')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordDataComponent {
  formConfig: SimpleFormConfig<ResetPasswordDataFormConfig> = {
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
    },
  };

  options: SubmitOptions = {
    url: 'api/v1/user/password/reset/data',
    method: 'POST',
    subscribe: true,
  };
}
