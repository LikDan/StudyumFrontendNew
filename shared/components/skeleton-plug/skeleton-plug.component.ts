import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Head1Component } from '@ui/text/head1.component';

@Component({
  selector: 'skeleton-plug',
  standalone: true,
  imports: [CommonModule, Head1Component],
  templateUrl: './skeleton-plug.component.html',
  styleUrls: ['./skeleton-plug.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonPlugComponent implements OnChanges {
  @Input({ required: true }) plugComponent!: Type<any>;
  @Input({ required: true }) type!: 'loading' | 'error' | 'empty';
  @Input() noDataText: string = 'noData';

  private host = inject(ElementRef<HTMLElement>);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.host.nativeElement.classList.remove(changes['type'].previousValue);
      this.host.nativeElement.classList.add(changes['type'].currentValue);
    }
  }
}
