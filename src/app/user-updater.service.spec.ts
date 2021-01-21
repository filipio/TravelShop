import { TestBed } from '@angular/core/testing';

import { UserUpdaterService } from './user-updater.service';

describe('UserUpdaterService', () => {
  let service: UserUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
