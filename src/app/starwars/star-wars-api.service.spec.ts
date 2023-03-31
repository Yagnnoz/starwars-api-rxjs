import { TestBed } from '@angular/core/testing';

import { StarWarsAPIService } from './star-wars-api.service';

describe('StarWarsAPIService', () => {
  let service: StarWarsAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarWarsAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
