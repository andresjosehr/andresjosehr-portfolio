import { TestBed } from '@angular/core/testing';

import { IpserviceService } from './ipservice.service';

describe('IpserviceService', () => {
  let service: IpserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
