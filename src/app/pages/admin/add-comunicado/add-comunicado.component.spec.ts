import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComunicadoComponent } from './add-comunicado.component';

describe('AddComunicadoComponent', () => {
  let component: AddComunicadoComponent;
  let fixture: ComponentFixture<AddComunicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddComunicadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
