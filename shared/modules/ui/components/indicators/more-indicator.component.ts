import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-more-indicator',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styles: [`
    @import "themes";
    @import "indents";

    :host {
      border-radius: 50%;
      width: $indent2;
      height: $indent2;

      @include theme {
        background-color: $secondaryColor;
        color: $onSecondaryColor;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoreIndicatorComponent {

}
