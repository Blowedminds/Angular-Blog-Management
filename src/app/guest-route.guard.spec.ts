import { TestBed, async, inject } from '@angular/core/testing';

import { GuestRouteGuard } from './guest-route.guard';

describe('GuestRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuestRouteGuard]
    });
  });

  it('should ...', inject([GuestRouteGuard], (guard: GuestRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
