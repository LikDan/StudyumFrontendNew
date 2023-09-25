import { SimpleFormConfigElement } from '@shared/modules/ui/entities/form.config';
import { Preferences } from '@shared/entities/preferences';

export interface UserPreferencesFormData extends Preferences {
}

export interface UserPreferencesFormConfig {
  theme: SimpleFormConfigElement;
  language: SimpleFormConfigElement;
  timezone: SimpleFormConfigElement;
}