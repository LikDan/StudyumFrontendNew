import { Injectable } from '@angular/core';
import {
  DependentFormConfigElementTypeConfig,
  SimpleFormConfig,
  SimpleFormConfigElement,
  SimpleFormConfigElements,
  SimpleFormConfigValue,
} from '@shared/modules/ui/entities/form.config';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, of, shareReplay } from 'rxjs';
import { cacheable } from '@shared/rxjs/pipes/cacheable.pipe';

@Injectable({
  providedIn: 'root',
})
export class SimpleFormConfigService {
  getFormValue<V extends Object>(config?: SimpleFormConfig<any, V> | null): Observable<V | null> {
    return config && config.value ? this._getFormValue(config.value) : of(null);
  }

  buildForm<C extends SimpleFormConfigElements<C>>(config: SimpleFormConfig<C>): FormGroup {
    const controls = Object.entries(config.elements)
      .map(v => v as unknown as [string, SimpleFormConfigElement])
      .map(v => [v[0], v[1].control ?? this.buildControl(v[1])]);

    const form = new FormGroup<any>(Object.fromEntries(controls));
    this._registerDependentElements(form, config);
    return form;
  }

  buildControl(element: SimpleFormConfigElement): FormControl {
    return new FormControl(element.initial, element.validators);
  }

  private _getFormValue<V extends Object>(value: SimpleFormConfigValue<V>): Observable<V | null> {
    if (typeof value === 'function') return this._getFormValue(value());
    if (value instanceof Observable) return value;
    return of(value);
  }

  private _registerDependentElements<T extends SimpleFormConfigElements<T>>(form: FormGroup, config: SimpleFormConfig<T>): void {
    for (let key in config.elements) {
      if ('dependsOn' in (config.elements[key].typeConfig ?? {}))
        this._registerDependentElement(form, config.elements[key].typeConfig as DependentFormConfigElementTypeConfig);
    }
  }

  private _registerDependentElement(form: FormGroup, element: DependentFormConfigElementTypeConfig): void {
    element.items = form.controls[element.dependsOn].valueChanges
      .pipe(cacheable(element.dependsItems, element.cacheable))
  }
}
