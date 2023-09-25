import { SimpleFormConfigElement } from '@shared/modules/ui/entities/form.config';

export interface SignUpJoinStudyPlaceFormData {
  name?: string | null;
  studyPlaceID?: string | null;
  role?: string | null;
  roleName?: string | null;
}

export interface SignUpJoinStudyPlaceFormConfig {
  name: SimpleFormConfigElement;
  studyPlaceID: SimpleFormConfigElement;
  role: SimpleFormConfigElement;
  roleName: SimpleFormConfigElement;
}