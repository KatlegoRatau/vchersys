import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashempComponent } from './dashemp.component';

describe('DashempComponent', () => {
  let component: DashempComponent;
  let fixture: ComponentFixture<DashempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
