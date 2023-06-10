import { TestBed } from '@angular/core/testing';

import { ConsultarReservaService } from './consultar-reserva.service';

describe('ConsultarReservaService', () => {
  let service: ConsultarReservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarReservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
