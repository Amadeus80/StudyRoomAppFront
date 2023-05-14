import { TestBed } from '@angular/core/testing';

import { TokenExpiredGuard } from './token-expired.guard';

describe('TokenExpiredGuard', () => {
  let guard: TokenExpiredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TokenExpiredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
