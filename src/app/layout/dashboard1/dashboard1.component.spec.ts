import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard1Component } from './dashboard1.component';

describe('Dashboard1Component', () => {
  let component: Dashboard1;
  let fixture: ComponentFixture<Dashboard1>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard1 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
