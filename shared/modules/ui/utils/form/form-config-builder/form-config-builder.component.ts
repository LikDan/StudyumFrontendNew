import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '@ui/inputs/text-input/text-input.component';
import { FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import {
  SimpleFormConfig,
  SimpleFormConfigElement,
  SimpleFormConfigElements,
} from '@shared/modules/ui/entities/form.config';
import { ItemsSelectComponent } from '@ui/selects/items-select/items-select.component';
import { SearchableSelectComponent } from '@ui/selects/searchable-select/searchable-select.component';
import { AutocompleteTextComponent } from '@ui/selects/autocomplete-text/autocomplete-text.component';

@Component({
  selector: 'simple-form-config-builder',
  templateUrl: './form-config-builder.component.html',
  styleUrls: ['./form-config-builder.component.scss'],
  imports: [CommonModule, TextInputComponent, ReactiveFormsModule, ItemsSelectComponent, SearchableSelectComponent, AutocompleteTextComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormConfigBuilderComponent<T extends SimpleFormConfigElements<T>> {
  @Input({required: true}) config!: SimpleFormConfig<T>

  formDirective = inject(FormGroupDirective);

  trackBy = (_: number, el: [string, SimpleFormConfigElement]) => el[0]

  get formConfigEntries(): [string, SimpleFormConfigElement][] {
    return Object.entries(this.config.elements ?? {});
  }

  getControlByName(name: string): FormControl | null {
    return this.formDirective.form.controls[name] as FormControl | null;
  }
}
