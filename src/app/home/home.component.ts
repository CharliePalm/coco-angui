import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { filter, take, switchMap, timer, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent {
  @ViewChild('backgroundVideo') video!: ElementRef<HTMLVideoElement>;
  loaded = false;
  bringTheBeatIn = false;

  ngAfterViewInit(): void {
    const videoEl = this.video.nativeElement;
    videoEl.muted = true;
    videoEl.setAttribute('playsinline', 'true');
    videoEl.setAttribute('muted', 'true');
    videoEl.load();
    fromEvent(videoEl, 'loadeddata')
      .pipe(
        filter(() => this.video.nativeElement.readyState >= 2),
        take(1),
        switchMap((_) => timer(500)),
        map((_) => {
          this.loaded = true;
        }),
        switchMap((_) => timer(500)),
      )
      .subscribe();
    // this.router.events.subscribe((_) => this.checkBgType());
    // this.store.load();
  }
}
