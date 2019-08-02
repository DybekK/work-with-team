import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsLeftbarComponent } from './groups-leftbar.component';

describe('GroupsLeftbarComponent', () => {
  let component: GroupsLeftbarComponent;
  let fixture: ComponentFixture<GroupsLeftbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsLeftbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
