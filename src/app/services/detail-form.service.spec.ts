import { TestBed } from '@angular/core/testing';

import { DetailFormService } from './detail-form.service';

describe('DetailFormService', () => {
  let service: DetailFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
