import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { WorkOption } from 'src/app/shared/model';

@Component({
  selector: 'app-exhibitions',
  standalone: false,
  templateUrl: './exhibitions.component.html'
})
export class ExhibitionsComponent {
  upOption = WorkOption.Flyers;
}
