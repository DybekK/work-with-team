import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftbarAllComponent } from './leftbar-all.component';

describe('LeftbarAllComponent', () => {
  let component: LeftbarAllComponent;
  let fixture: ComponentFixture<LeftbarAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftbarAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftbarAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
