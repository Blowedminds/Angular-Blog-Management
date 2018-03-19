import { TestBed, inject } from '@angular/core/testing';

import { AdminRequestService } from './admin-request.service';

describe('AdminRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminRequestService]
    });
  });

  it('should be created', inject([AdminRequestService], (service: AdminRequestService) => {
    expect(service).toBeTruthy();
  }));
});
