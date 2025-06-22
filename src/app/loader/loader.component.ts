import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: false,
})
export class LoaderComponent {
  @Input() size?: 'sm' | 'md' | 'lg';
  @Input() loading: boolean | null | undefined = true;
  @Input() useLight = false;
  @Output() transitionOutCompleted = new EventEmitter<boolean>();
  done = false;
  onAnimationDone(): void {
    if (!this.loading) {
      this.done = true;
      this.transitionOutCompleted.emit(true);
    }
  }
}
