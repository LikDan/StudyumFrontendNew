import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { SignUpFormConfig, SignUpFormData } from '@user/modules/auth/components/signup/signup.dto';
import { SimpleFormConfig } from '@shared/modules/ui/entities/form.config';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [translatePrefixProvider('signup')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  formConfig: SimpleFormConfig<SignUpFormConfig> = {
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
        validators: [Validators.required, Validators.minLength(8)],
      },
      passwordConfirm: {
        type: 'password',
        typeConfig: {
          label: 'passwordConfirm',
        },
        validators: [Validators.required, Validators.minLength(8)],
      },
    },
  };

  options: SubmitOptions = {
    url: 'api/v1/user/signup',
    method: 'POST',
    subscribe: true,
  };

  proceedValue(value: SignUpFormData): SignUpFormData | null {
    if (value.password !== value.passwordConfirm) return null;
    return value;
  };
}
