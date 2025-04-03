import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoversComponent } from './covers.component';

describe('CoversComponent', () => {
  let component: CoversComponent;
  let fixture: ComponentFixture<CoversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
