import { Component } from '@angular/core';
import { Store } from '../shared/service/store';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { OtherDataType } from '../shared/model';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
})
export class AboutComponent {
  loading = true;
  loaderFinished = false;
  constructor(private store: Store) {
    this.bio$ = this.store.getOtherData().pipe(
      map((data) => {
        this.loading = false;
        return data
          .find((dat) => dat.title === OtherDataType.Bio)!
          .value.split('\n');
      }),
    );
  }

  public bio$: Observable<string[]>;
}
