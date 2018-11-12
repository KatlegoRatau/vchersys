import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealvoucherComponent } from './mealvoucher.component';

describe('MealvoucherComponent', () => {
  let component: MealvoucherComponent;
  let fixture: ComponentFixture<MealvoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealvoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
