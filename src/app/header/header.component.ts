import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WorkOption } from '../shared/model';
import { BehaviorSubject, filter, first, ReplaySubject, timer } from 'rxjs';

const positions: Record<WorkOption, number> = {
  [WorkOption.Photos]: 0,
  [WorkOption.Videos]: 1,
  [WorkOption.Animations]: 2,
  [WorkOption.Covers]: 3,
  [WorkOption.Flyers]: 4,
};

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @ViewChild('workBtn') workBtn!: ViewChild;
  dropdown = false;
  forceClose = false;
  toggle = () => {
    this.dropdown = !this.dropdown;
  };

  options: Set<WorkOption>;
  selectedOption?: WorkOption;
  sortedOptions!: WorkOption[];

  constructor(public router: Router) {
    this.options = new Set(Object.values(WorkOption));
    this.sortedOptions = Array.from(this.options);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.setSelectedOption(this.router.url.slice(1) as any));
  }

  optionClicked(newSelectedOption: WorkOption) {
    this.dropdown = false;
    this.router.navigate([newSelectedOption]);
    this.forceClose = true;
    timer(250).subscribe(() => {
      this.forceClose = false;
    });
  }

  setSelectedOption(newSelectedOption: WorkOption) {
    // if we're navigating away from a works page
    if (!positions[newSelectedOption] && this.selectedOption) {
      this.options.add(this.selectedOption);
      this.selectedOption = undefined;
    }
    // if we're navigating to a works page
    if (
      this.options.has(newSelectedOption) &&
      this.selectedOption !== newSelectedOption
    ) {
      if (this.selectedOption) this.options.add(this.selectedOption);
      this.selectedOption = newSelectedOption as any;
      this.options.delete(this.selectedOption as any);
    }
    this.sortedOptions = Array.from(this.options).sort(
      (a, b) => positions[a] - positions[b],
    );
  }
}
