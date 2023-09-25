import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SimpleFormConfig } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { EmailConfirmFormConfig } from '@user/modules/auth/components/email-confirm/email-confirm.dto';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import { EmailConfirmService } from '@user/modules/auth/components/email-confirm/email-confirm.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-reset-password-code',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss'],
  providers: [translatePrefixProvider('email.confirm')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailConfirmComponent {
  formConfig: SimpleFormConfig<EmailConfirmFormConfig> = {
    elements: {
      code: {
        type: 'text',
        typeConfig: {
          label: 'code',
        },
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      },
    },
  };

  private service = inject(EmailConfirmService);

  options = this.service.formOptions;

  constructor() {
    this.service.sendCode().pipe(takeUntilDestroyed()).subscribe();
  }
}
