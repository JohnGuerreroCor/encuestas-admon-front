import { TestBed } from '@angular/core/testing';

import { ObligatorioService } from './obligatorio.service';

describe('ObligatorioService', () => {
  let service: ObligatorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObligatorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
