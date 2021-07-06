import { TestBed } from '@angular/core/testing';

import { VehiclesServiceService } from './vehicles-service.service';

describe('VehiclesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehiclesServiceService = TestBed.get(VehiclesServiceService);
    expect(service).toBeTruthy();
  });
});
