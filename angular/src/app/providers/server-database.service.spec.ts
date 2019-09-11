import { TestBed } from '@angular/core/testing';

import { ServerDatabaseService } from './server-database.service';

describe('ServerDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerDatabaseService = TestBed.get(ServerDatabaseService);
    expect(service).toBeTruthy();
  });
});
