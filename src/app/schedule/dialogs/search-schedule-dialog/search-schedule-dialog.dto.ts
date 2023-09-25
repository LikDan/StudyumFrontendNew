import { DependentFormConfigElementTypeConfig, SimpleFormConfigElement } from '@shared/modules/ui/entities/form.config';

export interface SearchScheduleFormData {
  studyPlaceID?: string | null;
  type?: string | null;
  typename?: string | null;
}

export interface SearchScheduleFormConfig {
  studyPlaceID: SimpleFormConfigElement;
  type: SimpleFormConfigElement;
  typename: SimpleFormConfigElement<string, DependentFormConfigElementTypeConfig>;
}
