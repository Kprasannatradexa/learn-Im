import { TestBed } from '@angular/core/testing';

import { UserProfileRepositoryService } from './user-profile-repository.service';

describe('UserProfileRepositoryService', () => {
  let service: UserProfileRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
