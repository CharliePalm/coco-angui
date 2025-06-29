import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routeAnimations } from './route.animations';
import { environment } from 'src/environments/environment';
import { inject } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
  animations: [routeAnimations],
})
export class AppComponent {
  title = 'Moni Anguiano';
  constructor(public router: Router) {
    if (environment.production) {
      inject();
    }
  }
}
