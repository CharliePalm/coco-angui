import { Component, HostListener, OnInit } from '@angular/core';
import { WorkOption } from 'src/app/shared/model';
import { Random } from '../../shared/utils/random.util';

@Component({
  selector: 'app-covers',
  standalone: false,
  templateUrl: './covers.component.html',
})
export class CoversComponent {
  upOption = WorkOption.Animations;
  downOption = WorkOption.Flyers;
  images = [
    'CAISTEDELCIELO Mila la Morena.jpg',
    'Guapa Remix Chillona.jpg',
    'iadoreu copy.jpeg',
    'DBK copy.jpeg',
    'Neckhair copy.jpg',
    'lloro despues del sexo mila la morena.png',
    'Easy copy.jpg',
    'Viento FalconShop.jpeg',
    'luchador adan diaz.jpg',
    'Escapando Chillona.jpg',
    'a little love final Deryk G.jpeg',
    'luchador alt cover.jpeg',
    'Freakygirl Mila la Morena.jpeg',
    'btb copy.jpg',
    'never too young cover copy.jpeg',
    'Guapa Chillona.jpg',
    'forgive me_ copy.jpg',
    'puchita cam bolden.jpg',
  ];
}
