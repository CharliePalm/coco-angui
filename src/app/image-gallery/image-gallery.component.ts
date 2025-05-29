import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Random } from '../shared/utils/random.util';
import { BehaviorSubject, map, Observable, timer } from 'rxjs';
type imageStyleType = [
  {
    top: string;
    left: string;
    rotate: string;
    'z-index': number;
  },
  { x?: string; y?: string },
];

@Component({
  selector: 'app-image-gallery',
  standalone: false,
  templateUrl: './image-gallery.component.html',
})
export class ImageGalleryComponent implements OnInit, AfterViewInit {
  @ViewChildren('videoElement') videoElements!: QueryList<
    ElementRef<HTMLVideoElement>
  >;
  @Input() images!: string[];
  @Input() seed?: number;
  @Input() mobileSeed?: number;
  @Input() location!: string;
  @Input() rows: number = 3;
  @Input() cols: number = 6;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() useTitle = true;
  @Input() rotate = true;
  @Input() offsetTop = 0;
  @Input() mediaType: 'image' | 'video' | 'animation' = 'image';
  @Input() useFixed = false;
  @Input() useS3 = false;

  aspectRatios: number[] = [];
  random!: Random;
  topOffset = 0;
  selectedIndex = -1;
  loaded = 0;
  viewInitialized = false;
  afterViewInitialized = new BehaviorSubject<boolean>(false);
  scrollCompleted$!: Observable<boolean>;
  public get scale(): string {
    if (this.mediaType === 'image') {
      return this.size === 'md' ? `2.75` : `5`;
    }
    const val = 2.75 * (window.innerWidth <= 768 ? 0.75 : 1);
    return `${val}`;
  }

  ngOnInit(): void {
    if (!this.mobileSeed) {
      // this.mobileSeed = this.seed;
    }
    this.aspectRatios = new Array(this.images.length).fill(0);
    this.random = new Random(
      this.previousIsMobile ? this.mobileSeed : this.seed,
    );
    // console.log('using seed: ' + this.random.getSeed());
    this.imageStyle = this.images.map((_, index) => this.getImageStyle(index));
    this.viewInitialized = true;
    this.scrollCompleted$ = timer(250).pipe(map(() => true));
  }

  ngAfterViewInit(): void {
    this.afterViewInitialized.next(true);
  }

  togglePlay(index: number): void {
    const video = this.videoElements.toArray()[index].nativeElement;
    video.paused ? video.play() : video.pause();
  }

  private previousIsMobile = window.innerWidth <= 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    const width = (event.target as Window).innerWidth;
    const isMobile = width <= 768;
    // Only fire when crossing the 768px boundary
    if (isMobile !== this.previousIsMobile) {
      this.previousIsMobile = isMobile;
      this.ngOnInit();
    }
  }

  imageStyle: imageStyleType[] = [];

  getImageStyle(index: number): imageStyleType {
    const randomness = !this.previousIsMobile ? 75 : 25;
    const r = (randAmt: number = randomness) =>
      this.random.nextInt(-1 * randAmt, randAmt);
    const rows = !this.previousIsMobile ? this.rows : this.cols;
    const cols = !this.previousIsMobile ? this.cols : this.rows;
    const row = Math.floor(index / cols);
    const col = index % cols;
    const randomOffsetX = this.useFixed ? 0 : r();
    const randomOffsetY = this.useFixed
      ? this.offsetTop
      : !this.offsetTop
        ? r()
        : this.offsetTop * (r() / r());
    this.topOffset = (this.size === 'md' ? 40 : 20) + randomness;
    return [
      {
        top: `calc(${(100 * row) / rows}dvh + ${randomOffsetY}px + ${this.topOffset}px)`,
        left: `calc(${(100 * col) / cols}dvw + ${randomOffsetX}px)`,
        rotate: `rotate(${Math.floor(r(3))}deg)`,
        'z-index': Math.ceil(this.random.nextInt(0, 9)),
      },
      {},
    ];
  }

  focus(i: number) {
    // for generating seeds:
    // this.ngOnInit();
    // return;
    if (this.isSelected(i)) {
      this.selectedIndex = -1;
      return;
    }

    const oldIndex = this.selectedIndex;

    if (!this.imageStyle[i][1].x) {
      const img = document.getElementsByTagName(
        this.mediaType !== 'image' ? 'video' : 'img',
      )[i];
      const rect = img.getBoundingClientRect();
      // console.log(rect);
      const x = `calc(50vw - ${rect.left + rect.width / 2}px)`;
      const y = `calc(50vh - ${rect.top + rect.height / 2}px)`;

      this.imageStyle[i] = [this.imageStyle[i][0], { x, y }];
      this.selectedIndex = i;
    } else {
      this.selectedIndex = i;
    }

    if (this.mediaType !== 'image' && this.selectedIndex !== -1) {
      this.onVideoHover(undefined as any, false, oldIndex);
    }
  }

  isSelected = (index: number) => this.selectedIndex === index;

  imageLoaded(index: number) {
    this.loaded++;
    const img = document.getElementsByTagName(
      this.mediaType !== 'image' ? 'video' : 'img',
    )[index];
    if (img instanceof HTMLImageElement) {
      this.aspectRatios[index] = img.naturalWidth / img.naturalHeight;
    }
  }

  onVideoHover(event: MouseEvent, isHovering: boolean, index: number) {
    if (this.mediaType !== 'animation') {
      return;
    }
    const videos = this.videoElements.toArray();
    if (videos[index]) {
      const video = videos[index].nativeElement as HTMLVideoElement;
      if (isHovering) {
        video
          .play()
          .catch((error) => console.error('Error playing video:', error));
      } else if (!this.isSelected(index)) {
        video.pause();
      }
    }
  }

  fullScreen(i: number): void {
    const videos = this.videoElements.toArray();
    if (videos[i]) {
      const video = videos[i].nativeElement as HTMLVideoElement;
      video.requestFullscreen();
    }
  }
}
