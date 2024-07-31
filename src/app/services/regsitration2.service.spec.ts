import { TestBed } from '@angular/core/testing';

import { Regsitration2Service } from './regsitration2.service';

describe('Regsitration2Service', () => {
  let service: Regsitration2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Regsitration2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
