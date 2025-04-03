import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkOption } from '../shared/model';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  options: WorkOption[] = Object.values(WorkOption);
  constructor(public router: Router) {}
}
