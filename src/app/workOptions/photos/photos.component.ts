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
}
