import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UrlComponent } from '@ui/text/url.component';
import { TranslateComponent } from '../../../utils/translate/translate.component';
import { PrimaryButtonComponent } from '@shared/modules/ui/components/buttons/primary-button.component';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable, of, take, tap } from 'rxjs';
import { Request } from '@shared/modules/ui/entities/http';
import { Head1Component } from '@ui/text/head1.component';
import { Router } from '@angular/router';
import { SimpleFormConfig, SimpleFormConfigElements } from '@shared/modules/ui/entities/form.config';
import { SimpleFormConfigService } from '@shared/modules/ui/services/simple-form-config.service';
import { TextInputComponent } from '@ui/inputs/text-input/text-input.component';
import {
  FormConfigBuilderComponent,
} from '@shared/modules/ui/utils/form/form-config-builder/form-config-builder.component';

export interface SubmitOptions {
  url?: string | null,
  method: string,
  options?: Request | null,
  subscribe?: boolean | null
}

@Component({
  selector: 'default-form',
  templateUrl: './default-form.component.html',
  styleUrls: ['./default-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, UrlComponent, FormsModule, PrimaryButtonComponent, Head1Component, TextInputComponent, FormConfigBuilderComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultFormComponent<
  DATA,
  RESPONSE_DATA,
  CONFIG extends SimpleFormConfigElements<CONFIG>,
  VALUE extends Object = any,
  FORM_CONFIG extends { [K in keyof FORM_CONFIG]: AbstractControl<any, any>; } = {},
  PROCEEDED_DATA = DATA
> extends TranslateComponent implements OnInit {
  @Input() link: string | null = null;
  @Input() text: string | null = null;

  @Input() linkKey: string | null = null;
  @Input() linkText: string | null = null;

  @Input() submitOnInvalid: boolean = false;
  @Input() submitRedirect: string | null = null;

  @Input() submitOptions: SubmitOptions = {
    url: null,
    method: 'POST',
    options: null,
    subscribe: false,
  };

  @Input() formConfig: SimpleFormConfig<CONFIG, VALUE> | null = null;

  formGroupDirective = inject(FormGroupDirective, { optional: true });

  @Output() invalidSubmit = new EventEmitter<never>();
  @Output() submitResponse = new EventEmitter<Observable<RESPONSE_DATA>>();
  @Output() submitForm = new EventEmitter<PROCEEDED_DATA | null>();

  private http = inject(HttpClient);
  private router = inject(Router);
  private configService = inject(SimpleFormConfigService);

  private _form!: FormGroup;

  get form(): FormGroup<FORM_CONFIG> {
    return this.formGroupDirective?.form || this._form;
  }

  @Input() set submitURL(value: string | null) {
    this.submitOptions.url = value;
  };

  @Input() set submitMethod(value: string) {
    this.submitOptions.method = value;
  };

  @Input() set submitHttpOptions(value: Request | null) {
    this.submitOptions.options = value;
  };

  @Input() set submitSubscribe(value: boolean | null) {
    this.submitOptions.subscribe = value;
  };

  @Input() proceedValue: (data: DATA) => PROCEEDED_DATA | null = data => data as unknown as PROCEEDED_DATA;

  ngOnInit(): void {
    this._form = this.formConfig ?
      this.configService.buildForm(this.formConfig) :
      new FormGroup<any>([]);

    this.configService.getFormValue(this.formConfig)
      .pipe(take(1))
      .pipe(filter(v => !!v))
      .pipe(map(v => v!))
      .subscribe(this._form.patchValue.bind(this._form))
  }

  submit(): void {
    if (this.form?.invalid) {
      this.form.markAsTouched();
      this.invalidSubmit.emit();
      if (!this.submitOnInvalid) return;
    }

    const value = this.proceedValue(this.form?.value as DATA);
    this.submitForm.emit(value)

    if (this.submitOptions.url) this._makeHttpRequest(value);
    if (!this.submitOptions.url && this.submitRedirect) this.redirect();
  }

  private _makeHttpRequest(value: PROCEEDED_DATA | null): void {
    if (!this.submitOptions.url) return;

    if (!value) return;

    //todo move http logic to the custom provider
    const response$ = this.http.request<RESPONSE_DATA>(
      this.submitOptions.method,
      this.submitOptions.url,
      { ...this.submitOptions, body: value },
    ).pipe(tap(this.redirect.bind(this)));

    this.submitResponse.emit(response$);
    if (this.submitOptions.subscribe) response$.pipe(take(1)).subscribe();
  }

  private redirect(): void {
    if (!this.submitRedirect) return;

    this.router.navigate([this.submitRedirect]).then();
  }
}
