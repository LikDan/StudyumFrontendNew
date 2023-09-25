import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { Validators } from '@angular/forms';
import { LoginFormConfig } from '@user/modules/auth/components/login/login.dto';
import { SimpleFormConfig } from '@shared/modules/ui/entities/form.config';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [translatePrefixProvider('login')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  formConfig: SimpleFormConfig<LoginFormConfig> = {
    elements: {
      login: {
        type: 'text',
        typeConfig: {
          label: 'login',
        },
        validators: [Validators.required],
      },
      password: {
        type: 'password',
        typeConfig: {
          label: 'password',
        },
        validators: [Validators.required],
      },
    },
  };

  options: SubmitOptions = {
    url: 'api/v1/user/login',
    method: 'PUT',
    subscribe: true,
  };
}
