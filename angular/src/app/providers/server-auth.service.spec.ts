import { TestBed } from '@angular/core/testing';

import { ServerAuthService } from './server-auth.service';

describe('ServerAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerAuthService = TestBed.get(ServerAuthService);
    expect(service).toBeTruthy();
  });
});
