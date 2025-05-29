import { Component } from '@angular/core';
import { WorkOption } from 'src/app/shared/model';

@Component({
  selector: 'app-animations',
  standalone: false,
  templateUrl: './animations.component.html',
})
export class AnimationsComponent {
  upOption = WorkOption.Videos;
  downOption = WorkOption.Covers;

  animations = [
    'adhd video copy.mov',
    'folklore azul de estrellas.mp4',
    'gotalight.mp4',
    'interlinked copy.mp4',
    'liar 2.0 copy.mp4',
    'milan.mp4',
    'abc.mp4',
    'soundbath FINAL copy.mov',
    'messup.mov',
  ];
}
