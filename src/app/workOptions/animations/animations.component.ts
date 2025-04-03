import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { WorkOption } from 'src/app/shared/model';

@Component({
  selector: 'app-animations',
  standalone: false,
  templateUrl: './animations.component.html'
})
export class AnimationsComponent {
  upOption = WorkOption.Videos;
  downOption = WorkOption.Covers;
}
