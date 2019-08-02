import { TestBed } from '@angular/core/testing';

import { HttpconfigService } from './httpconfig.service';

describe('HttpconfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpconfigService = TestBed.get(HttpconfigService);
    expect(service).toBeTruthy();
  });
});
