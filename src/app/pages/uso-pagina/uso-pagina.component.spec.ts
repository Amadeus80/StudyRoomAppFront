import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsoPaginaComponent } from './uso-pagina.component';

describe('UsoPaginaComponent', () => {
  let component: UsoPaginaComponent;
  let fixture: ComponentFixture<UsoPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsoPaginaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
