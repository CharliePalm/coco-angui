import { Component } from '@angular/core';
import { WorkOption } from 'src/app/shared/model';

@Component({
  selector: 'app-flyers',
  standalone: false,
  templateUrl: './flyers.component.html'
})
export class FlyersComponent {
  upOption = WorkOption.Covers;
  downOption = WorkOption.Exhibitions;
}
