import { FormControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectItems } from '@shared/modules/ui/entities/select';

export type SimpleFormConfigElements<C> = { [K in keyof C]: SimpleFormConfigElement; }

export type SimpleFormConfigValue<V extends Object> = V | Observable<V> | (() => SimpleFormConfigValue<V>)

export interface SimpleFormConfig<T extends SimpleFormConfigElements<T>, V extends Object = any> {
  elements: T;
  value?: SimpleFormConfigValue<V>;
}

export interface SimpleFormConfigElement<C = string, T extends SimpleFormConfigElementTypeConfig<C> = SimpleFormConfigElementTypeConfig<C>> {
  control?: FormControl<C>;
  type: SimpleFormConfigElementType;
  typeConfig?: T;
  initial?: C;
  validators?: ValidatorFn | ValidatorFn[];
}

export type SimpleFormConfigElementType =
  'text'
  | 'password'
  | 'file'
  | 'image'
  | 'checkbox'
  | 'select'
  | 'searchable_select'
  | 'autocomplete_text'

export interface SimpleFormConfigElementTypeConfig<V = string> {
  placeholder?: string;
  label?: string;
  hint?: string;
  filetypes?: string | string[];
  items?: SelectItems<V>;
}


export interface DependentFormConfigElementTypeConfig<V = string> extends SimpleFormConfigElementTypeConfig<V> {
  dependsOn: string;
  cacheable?: boolean;
  dependsItems: (item: any) => SelectItems<V>;
}
