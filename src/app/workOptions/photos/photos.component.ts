import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { WorkOption } from '../../shared/model';

@Component({
  selector: 'app-photos',
  standalone: false,
  templateUrl: './photos.component.html'
})
export class PhotosComponent {
  downOption = WorkOption.Videos;
  images = [
    'Artboard 2 copy 2.jpg',
    'Scan 4.jpg',
    'IMG_9008.JPG',
    'IMG_0326.jpg',
    'IMG_9550.JPG',
    'Artboard 5 copy.jpg',
    'IMG_0633.JPG',
    'muchalucha 3 copy.jpeg',
    'IMG_2478.JPG',
    'IMG_9738 2.jpg',
    'Artboard 3 copy 2.jpg',
    'IMG_8103.JPG',
    'hayley 3 copy.jpg',
    'Artboard 1 copy 2.jpg',
    'IMG_8095.jpg',
    'IMG_0654.JPG',
    'hayley copy.jpg',
    'IMG_0332.jpg',
    'muchalucha copy.jpeg',
    'IMG_8096.jpg',
    'Artboard 4 copy.jpg',
    'IMG_9982.jpg',
    'IMG_9314.jpg',
    'Artboard 8 copy.jpg',
    'IMG_9319.JPG',
    'Scan 6 copy.jpeg',
    'IMG_8105.jpg',
    'IMG_9988.jpg',
    'IMG_8100.jpg',
    'IMG_0337.jpg',
    'IMG_9014.jpg',
    'muchalucha 1 copy.jpeg',
    'Artboard 3 copy 3.jpg',
    'IMG_0339.jpg',
    'Scan 5.jpg',
    'hayley 2.jpg',
    'IMG_0679.JPG',
    'Artboard 1 copy 3.jpg',
    'IMG_9569.JPG',
    'Artboard 4 copy 2.jpg',
    'IMG_2479.JPG',
    'muchalucha 2 copy 2.jpeg',
    'IMG_9986.jpg',
    'IMG_9007.JPG',
    'Artboard 4.JPG',
    'IMG_0322.jpg',
    'IMG_9338.jpg',
    'Artboard 2 copy 3.jpg',
    'IMG_9570.jpg',
    'Scan 4 copy.jpeg'
  ]
}
