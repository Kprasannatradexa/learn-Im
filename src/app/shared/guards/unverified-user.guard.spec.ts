import { TestBed } from '@angular/core/testing';

import { UnverifiedUserGuard } from './unverified-user.guard';

describe('UnverifiedUserGuard', () => {
  let guard: UnverifiedUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnverifiedUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
