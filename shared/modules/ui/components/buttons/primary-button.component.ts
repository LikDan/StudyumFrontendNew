import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslateComponent } from '@shared/modules/ui/utils/translate/translate.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'primary-button',
  template: '<button color="primary" mat-flat-button><ng-content></ng-content>{{key | translate}}</button>',
  styles: [`
    button {
      width: 100%;
      height: 100%;
    }
  `],
  imports: [CommonModule, MatButtonModule, TranslateModule],
  standalone: true,
})
export class PrimaryButtonComponent extends TranslateComponent {
}
