import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { SimpleFormConfig } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import {
  ResetPasswordCodeFormConfig,
  ResetPasswordCodeFormData,
} from '@user/modules/auth/components/reset-password-code/reset-password-code.dto';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import { SignUpFormData } from '@user/modules/auth/components/signup/signup.dto';

@Component({
  selector: 'app-reset-password-code',
  templateUrl: './reset-password-code.component.html',
  styleUrls: ['./reset-password-code.component.scss'],
  providers: [translatePrefixProvider('resetPassword.code')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordCodeComponent {
  formConfig: SimpleFormConfig<ResetPasswordCodeFormConfig> = {
    elements: {
      code: {
        type: 'text',
        typeConfig: {
          label: 'code',
        },
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      },
      password: {
        type: 'password',
        typeConfig: {
          label: 'password',
        },
        validators: [Validators.required, Validators.minLength(8)],
      },
      passwordConfirm: {
        type: 'password',
        typeConfig: {
          label: 'passwordConfirm',
        },
        validators: [Validators.required, Validators.minLength(8)],
      }
    },
  };

  options: SubmitOptions = {
    url: 'api/v1/user/password/reset/code',
    method: 'POST',
    subscribe: true,
  };

  proceedValue(value: ResetPasswordCodeFormData): ResetPasswordCodeFormData | null {
    if (value.password !== value.passwordConfirm) return null;
    return value;
  };
}
