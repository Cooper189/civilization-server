import { TestBed, async, inject } from '@angular/core/testing';

import { LoginInGuard } from './login-in.guard';

describe('LoginInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginInGuard]
    });
  });

  it('should ...', inject([LoginInGuard], (guard: LoginInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
