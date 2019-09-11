import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksLeftbarComponent } from './tasks-leftbar.component';

describe('TasksLeftbarComponent', () => {
  let component: TasksLeftbarComponent;
  let fixture: ComponentFixture<TasksLeftbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksLeftbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
