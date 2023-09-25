import { SimpleFormConfigElement } from '@shared/modules/ui/entities/form.config';

export interface ResetPasswordDataFormData {
  login?: string | null;
  email?: string | null;
}

export interface ResetPasswordDataFormConfig {
  login: SimpleFormConfigElement;
  email: SimpleFormConfigElement;
}