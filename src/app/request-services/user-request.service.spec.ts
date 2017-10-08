import { TestBed, inject } from '@angular/core/testing';

import { UserRequestService } from './user-request.service';

describe('UserRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRequestService]
    });
  });

  it('should be created', inject([UserRequestService], (service: UserRequestService) => {
    expect(service).toBeTruthy();
  }));
});
