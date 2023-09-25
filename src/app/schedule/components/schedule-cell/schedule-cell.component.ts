import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, inject,
  Input,
  Output, signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson } from '@schedule/entities/schedule';
import { ScheduleLessonComponent } from '@schedule/components/schedule-lesson/schedule-lesson.component';
import { IconComponent } from '@ui/images/icon.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MoreIndicatorComponent } from '@ui/indicators/more-indicator.component';

@Component({
  selector: 'schedule-cell',
  standalone: true,
  imports: [CommonModule, ScheduleLessonComponent, IconComponent, MatTooltipModule, MoreIndicatorComponent],
  templateUrl: './schedule-cell.component.html',
  styleUrls: ['./schedule-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleCellComponent implements AfterViewInit {
  @Input({ required: false }) lessons!: Lesson[];
  @Input() isEditMode!: boolean;
  @Output() delete = new EventEmitter<null>();
  @Output() edit = new EventEmitter<null>();
  @ViewChild('section') sectionRef!: ElementRef<HTMLElement>;

  private cdr = inject(ChangeDetectorRef)

  scrollable = signal(false);

  get sectionWidth(): number {
    return this.sectionRef.nativeElement.clientWidth;
  }

  ngAfterViewInit(): void {
    this.sectionRef.nativeElement.scrollBy({ left: 10 });
    if (this.sectionRef.nativeElement.scrollLeft === 0) return;

    this.scrollable.set(true);
    this.sectionRef.nativeElement.scrollTo({ left: 0 });
    this.cdr.detectChanges()
  }

  next(): void {
    const scroll = this.sectionRef.nativeElement.scrollLeft;
    this.sectionRef.nativeElement.scrollBy({ left: this.sectionWidth });
    scroll === this.sectionRef.nativeElement.scrollLeft && this.sectionRef.nativeElement.scrollBy({ left: -this.sectionWidth });
  }

  previous(): void {
    const scroll = this.sectionRef.nativeElement.scrollLeft;
    this.sectionRef.nativeElement.scrollBy({ left: -this.sectionWidth });
    scroll === this.sectionRef.nativeElement.scrollLeft && this.sectionRef.nativeElement.scrollBy({ left: this.sectionWidth });
  }

  lessonTooltip(): string {
    const lesson = this.lessons[0];
    return `${lesson.startDate.toFormat('h:mm a')}-${lesson.endDate.toFormat('h:mm a')}`;
  }
}
