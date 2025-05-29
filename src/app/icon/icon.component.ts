import { Component, Input } from '@angular/core';
import { IconType } from '../shared/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class IconComponent {
  @Input() type!: IconType;
  @Input() clickable = true;
  IconType = IconType;
}
