import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkScrollerComponent } from './work-scroller.component';

describe('WorkScrollerComponent', () => {
  let component: WorkScrollerComponent;
  let fixture: ComponentFixture<WorkScrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkScrollerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
