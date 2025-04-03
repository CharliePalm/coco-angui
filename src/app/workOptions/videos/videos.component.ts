import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { WorkOption } from 'src/app/shared/model';

@Component({
  selector: 'app-videos',
  standalone: false,
  templateUrl: './videos.component.html'
})
export class VideosComponent {
  upOption = WorkOption.Photos;
  downOption = WorkOption.Animations;
}
