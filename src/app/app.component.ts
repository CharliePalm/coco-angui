import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routeAnimations } from './route.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
  animations: [routeAnimations]
})
export class AppComponent {
  title = '';
  constructor(public router: Router) {}
}
