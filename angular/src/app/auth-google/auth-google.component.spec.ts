import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGoogleComponent } from './auth-google.component';

describe('AuthGoogleComponent', () => {
  let component: AuthGoogleComponent;
  let fixture: ComponentFixture<AuthGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
