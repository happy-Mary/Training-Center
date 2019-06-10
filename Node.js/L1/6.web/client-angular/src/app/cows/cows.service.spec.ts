import { TestBed, inject } from '@angular/core/testing';

import { CowsService } from './cows.service';

describe('CowsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CowsService]
    });
  });

  it('should be created', inject([CowsService], (service: CowsService) => {
    expect(service).toBeTruthy();
  }));
});
