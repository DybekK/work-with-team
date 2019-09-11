import { TestBed } from '@angular/core/testing';

import { CalendarsService } from './calendars.service';

describe('CalendarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarsService = TestBed.get(CalendarsService);
    expect(service).toBeTruthy();
  });
});
