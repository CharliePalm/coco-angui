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

}
