import { TestBed, inject } from '@angular/core/testing';

import { EsvApiService } from './esv-api.service';

describe('EsvApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsvApiService]
    });
  });

  it('should be created', inject([EsvApiService], (service: EsvApiService) => {
    expect(service).toBeTruthy();
  }));
});
