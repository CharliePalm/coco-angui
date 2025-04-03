import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
  ],
  standalone: true,
})
export class HomeComponent {
  options: string[] = [
    'Photo',
    'Video',
    'Animations',
    'Covers',
    'Flyers',
    'Exhibitions',
  ];
  
  constructor() { }
}
