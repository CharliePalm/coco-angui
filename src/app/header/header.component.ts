import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WorkOption } from '../shared/model';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @ViewChild('workBtn') workBtn!: ViewChild;
  dropdown = false;
  toggle = () => {
    console.log('dropdown');
    this.dropdown = !this.dropdown;
  };
  options: WorkOption[] = Object.values(WorkOption);
  constructor(public router: Router) {}
}
