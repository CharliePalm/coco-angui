import { Component } from '@angular/core';
import { WorkOption } from 'src/app/shared/model';

@Component({
  selector: 'app-flyers',
  standalone: false,
  templateUrl: './flyers.component.html',
})
export class FlyersComponent {
  upOption = WorkOption.Covers;
  // downOption = WorkOption.Exhibitions;
  images = [
    'Artboard 2.PNG',
    'Scan 4 copy.jpeg',
    'flyer meg copy.jpeg',
    'FINGY copy.IG.jpg',
    'Scan 5 copy.jpg',
    'flyre abi copy.png',
    'MEG final copy.jpg',
    'Scan copy.jpeg',
    'interlay copy.jpeg',
    'MEH @@jpg copy.jpg',
    'abby.JPG',
    'opt 3 copy.jpg',
    'Meh Dorians.jpg',
    'division pointS.jpg',
    'Scan 2 copy.jpeg',
    'flyer final.png',
  ];
}
