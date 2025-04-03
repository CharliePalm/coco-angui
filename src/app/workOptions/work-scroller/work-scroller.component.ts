import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { WorkOption } from 'src/app/shared/model';

@Component({
  selector: 'app-work-scroller',
  standalone: false,
  templateUrl: './work-scroller.component.html'
})
export class WorkScrollerComponent implements OnInit, OnDestroy {
  @Input() upOption?: WorkOption;
  @Input() downOption?: WorkOption;
  doneInitting = false;
  timerSub!: Subscription;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.timerSub = timer(500).subscribe((_) => this.doneInitting = true);
  }

  ngOnDestroy(): void {
    this.timerSub.unsubscribe();
  }

  @HostListener('window:wheel', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  reroute(event: WheelEvent) {
    if (this.doneInitting) {
      if (this.downOption && event.deltaY > 0) {
        this.router.navigate([this.downOption]);
      } else if (this.upOption && event.deltaY < 0) {
        this.router.navigate([this.upOption]);
      }
    }
  }
}
