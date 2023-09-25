import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SimpleFormConfig } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import {
  SignUpJoinStudyPlaceFormConfig,
} from '@user/modules/auth/components/signup-join-study-place/singup-join-study-place.dto';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import {
  SingupJoinStudyPlaceService,
} from '@user/modules/auth/components/signup-join-study-place/singup-join-study-place.service';

@Component({
  selector: 'app-signup-join-study-place',
  templateUrl: './signup-join-study-place.component.html',
  styleUrls: ['./signup-join-study-place.component.scss'],
  providers: [translatePrefixProvider('join')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupJoinStudyPlaceComponent {
  private service = inject(SingupJoinStudyPlaceService);
  formConfig: SimpleFormConfig<SignUpJoinStudyPlaceFormConfig> = {
    elements: {
      name: {
        type: 'text',
        typeConfig: {
          label: 'name',
        },
        validators: [Validators.required],
      },
      studyPlaceID: {
        type: 'searchable_select',
        typeConfig: {
          label: 'studyPlace',
          items: this.service.studyPlaceList$,
        },
        validators: [Validators.required],
      },
      role: {
        type: 'select',
        typeConfig: {
          label: 'role',
          items: ['teacher', 'student'],
        },
        validators: [Validators.required],
      },
      roleName: {
        type: 'text',
        typeConfig: {
          label: 'roleName',
        },
        validators: [Validators.required],
      },
    },
  };

  options = this.service.formOptions;
}
