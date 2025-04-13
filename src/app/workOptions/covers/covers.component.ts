import { Component, HostListener, OnInit } from '@angular/core';
import { WorkOption } from 'src/app/shared/model';
import { Random } from '../../shared/utils/random.util';

type imageStyleType = [{ top: string, left: string, rotate: string, 'z-index': number }, boolean, {x?: string, y?: string}];
@Component({
  selector: 'app-covers',
  standalone: false,
  templateUrl: './covers.component.html',
})
export class CoversComponent implements OnInit {
  upOption = WorkOption.Animations;
  downOption = WorkOption.Flyers;
  random = new Random(1744561458128);
  topOffset = 0;
  
  ngOnInit(): void {
    this.imageStyle = this.images.map((_, index) => this.getImageStyle(index));
  }

  private previousIsMobile = window.innerWidth <= 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    const width = (event.target as Window).innerWidth;
    const isMobile = width <= 768;
    console.log(isMobile);
    // Only fire when crossing the 768px boundary
    if (isMobile !== this.previousIsMobile) {
      this.previousIsMobile = isMobile;
      this.ngOnInit();
    }
  }

  images = [
    'CAISTEDELCIELO Mila la Morena.jpg',
    'Guapa Remix Chillona.jpg',
    'iadoreu copy.jpg',
    'DBK copy.jpg',
    'Neckhair copy.jpg',
    'lloro despues del sexo mila la morena.png',
    'Easy copy.jpg',
    'Viento FalconShop.jpg',
    'luchador adan diaz.jpg',
    'Escapando Chillona.jpg',
    'a little love final Deryk G.jpg',
    'luchador alt cover.jpg',
    'Freakygirl Mila la Morena.jpeg',
    'btb copy.jpg',
    'never too young cover copy.jpg',
    'Guapa Chillona.jpg',
    'forgive me_ copy.jpg',
    'puchita cam bolden.jpg',
  ];
  imageStyle: imageStyleType[] = [];  

  getImageStyle(index: number): imageStyleType {
    const randomness = !this.previousIsMobile ? 75 : 25;
    const r = (randAmt: number = randomness) =>  this.random.nextInt(-1 * randAmt, randAmt);
    const rows = !this.previousIsMobile ? 3 : 5;
    const cols = !this.previousIsMobile ? 6 : 3;
    const row = Math.floor(index / cols);
    const col = index % cols;
    const randomOffsetX = r();
    const randomOffsetY = r();
    this.topOffset = 100 + randomness;
    const leftOffset = this.previousIsMobile ? 50 : 0;
    return [{
      top: `calc(${((100 * row) / rows)}% + ${randomOffsetY}px + ${this.topOffset}px)`,
      left: `calc(${(100 * col / cols)}% + ${randomOffsetX}px + ${leftOffset}px)`,
      rotate: `${Math.floor(r(10))}deg`,
      'z-index': Math.ceil(this.random.nextInt(0, 9)),
    }, false, {}];
  }

  focus(i: number) {
    if (this.imageStyle[i][1]) { 
      this.imageStyle[i][1] = false; 
      return; 
    }
    if (!this.imageStyle[i][2].x) {
      const img = document.getElementsByTagName('img')[i];
      const rect = img.getBoundingClientRect();
    
      const x = `calc(50vw - ${rect.left + rect.width / 2}px)`;
      const y = `calc(50vh - ${rect.top + rect.height / 2}px)`;
    
      this.imageStyle[i] = [this.imageStyle[i][0], true, { x, y }];
    } else {
      this.imageStyle[i][1] = true;
    }
  }
}
