import { TestBed, inject } from '@angular/core/testing';

import { NetApiService } from './net-api.service';

describe('NetApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetApiService]
    });
  });

  it('should be created', inject([NetApiService], (service: NetApiService) => {
    expect(service).toBeTruthy();
  }));
});
