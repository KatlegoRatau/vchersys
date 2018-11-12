import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogmainComponent } from './logmain.component';

describe('LogmainComponent', () => {
  let component: LogmainComponent;
  let fixture: ComponentFixture<LogmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
