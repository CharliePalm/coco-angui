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
import {
  BehaviorSubject,
  first,
  map,
  Observable,
  switchMap,
  timer,
} from 'rxjs';
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
  @Input() useRaw = false;
  @Input() offsetOverride?: string;

  // aspectRatios: number[] = [];
  random!: Random;
  topOffset = 0;
  selectedIndex = -1;
  loaded = 0;
  showLoader = new BehaviorSubject<boolean>(true);
  loading = new BehaviorSubject<boolean>(true);
  viewInitialized = false;
  afterViewInitialized = new BehaviorSubject<boolean>(false);
  scrollCompleted$!: Observable<boolean>;

  public get scale(): string {
    let val: number;
    if (this.mediaType === 'image') {
      val = this.size === 'md' ? 2.75 : 5;
      val *= window.innerWidth <= 500 ? 0.75 : 1;
    } else {
      val = 2.75 * (window.innerWidth <= 768 ? 0.75 : 1);
    }
    return `${val}`;
  }

  ngOnInit(): void {
    if (!this.mobileSeed) {
      this.mobileSeed = this.seed;
    }
    // this.aspectRatios = new Array(this.images.length).fill(0);
    this.random = new Random(
      this.previousIsMobile ? this.mobileSeed : this.seed,
    );
    console.log('using seed: ' + this.random.getSeed());
    this.imageStyle = this.images.map((_, index) => this.getImageStyle(index));
    this.viewInitialized = true;
    this.scrollCompleted$ = timer(300).pipe(map(() => true));
  }

  ngAfterViewInit(): void {
    this.afterViewInitialized.next(true);
  }

  togglePlay(index: number): void {
    const video = this.videoElements.toArray()[index].nativeElement;
    if (video.muted) {
      video.muted = false;
      video.play();
    } else {
      video.pause();
    }
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
    let randomOffsetX: string, randomOffsetY: string;
    if (this.offsetOverride !== undefined) {
      randomOffsetX = `${this.offsetOverride}`;
      randomOffsetY = `${this.offsetOverride}`;
    } else {
      randomOffsetX = this.useFixed ? '0px' : `${r()}px`;
      randomOffsetY = `${
        this.useFixed
          ? this.offsetTop
          : !this.offsetTop
            ? r()
            : this.offsetTop * (r() / r())
      }px`;
    }
    this.topOffset = (this.size === 'md' ? 40 : 20) + randomness;
    return [
      {
        top: `calc(${(100 * row) / rows}dvh + ${randomOffsetY} + ${this.topOffset}px)`,
        left: `calc(${(100 * col) / cols}dvw + ${randomOffsetX})`,
        rotate: `rotate(${Math.floor(r(3))}deg)`,
        'z-index': Math.ceil(this.random.nextInt(0, 9)),
      },
      {},
    ];
  }

  focus(i: number) {
    console.log('focusing', i);
    console.log('is selected:', this.isSelected(i));
    // for generating seeds:
    // this.ngOnInit();
    // return;
    if (this.isSelected(i)) {
      this.selectedIndex = -1;
      return;
    }

    if (this.mediaType === 'image' && !this.imageStyle[i][1].x) {
      const img = document.getElementsByTagName(
        this.mediaType !== 'image' ? 'video' : 'img',
      )[i];
      const rect = img.getBoundingClientRect();
      // console.log(rect);
      const x = `calc(50dvw - ${rect.left + rect.width / 2}px)`;
      const y = `calc(50dvh - ${rect.top + rect.height / 2}px)`;

      this.imageStyle[i] = [this.imageStyle[i][0], { x, y }];
      this.selectedIndex = i;
    } else {
      this.selectedIndex = i;
    }
    if (this.mediaType !== 'image') {
      const videoEl = this.videoElements.toArray()[i].nativeElement;
      videoEl.requestFullscreen();
    }
  }

  fullScreenChange(i: number) {
    console.log('fullscreen change: ', i);
    const el = this.videoElements.toArray()[i].nativeElement;
    if (!el.muted) {
      el.pause();
      el.muted = true;
      this.focus(i);
    } else {
      el.muted = false;
    }
  }

  isSelected = (index: number) => this.selectedIndex === index;

  imageLoaded(index: number) {
    this.loaded++;
    if (this.loaded === this.images.length) {
      timer(500)
        .pipe(
          first(),
          switchMap(() => {
            this.showLoader.next(false);
            return timer(300);
          }),
        )
        .subscribe(() => this.loading.next(false));
    }
    // img optimization? Idk probably won't make sense to use this
    // const img = document.getElementsByTagName(
    //   this.mediaType !== 'image' ? 'video' : 'img',
    // )[index];
    // if (img instanceof HTMLImageElement) {
    //   this.aspectRatios[index] = img.naturalWidth / img.naturalHeight;
    // }
  }

  onVideoHover(event: MouseEvent, isHovering: boolean, index: number) {
    if (this.mediaType === 'image' || this.isSelected(index)) {
      return;
    }
    const videos = this.videoElements.toArray();
    if (videos[index]) {
      const video = videos[index].nativeElement as HTMLVideoElement;
      if (isHovering) {
        video.muted = true;
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
      video.muted = false;
      this.focus(i);
      video.requestFullscreen();
    }
  }
}
