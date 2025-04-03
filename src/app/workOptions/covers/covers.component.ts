import { Component } from '@angular/core';
import { WorkOption } from 'src/app/shared/model';

@Component({
  selector: 'app-covers',
  standalone: false,
  templateUrl: './covers.component.html'
})
export class CoversComponent {
  upOption = WorkOption.Animations;
  downOption = WorkOption.Flyers;
}
