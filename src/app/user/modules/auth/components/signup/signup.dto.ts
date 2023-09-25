import { SimpleFormConfigElement } from '@shared/modules/ui/entities/form.config';

export interface SignUpFormData {
  login?: string | null;
  email?: string | null;
  password?: string | null;
  passwordConfirm?: string | null;
}

export interface SignUpFormConfig {
  login: SimpleFormConfigElement;
  email: SimpleFormConfigElement;
  password: SimpleFormConfigElement;
  passwordConfirm: SimpleFormConfigElement;
}
