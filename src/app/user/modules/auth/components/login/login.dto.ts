import { AbstractControl } from '@angular/forms';
import { SimpleFormConfigElement } from '@shared/modules/ui/entities/form.config';

export interface LoginFormData {
  login?: string | null;
  password?: string | null;
}

export interface LoginFormConfig {
  login: SimpleFormConfigElement;
  password: SimpleFormConfigElement;
}