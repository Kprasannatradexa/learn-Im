import { TestBed } from '@angular/core/testing';

import { AuthenticationRepositoryService } from './authentication-repository.service';

describe('AuthenticationRepositoryService', () => {
  let service: AuthenticationRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
