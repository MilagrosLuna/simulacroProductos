import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaProductoComponent } from './busqueda-producto.component';

describe('BusquedaProductoComponent', () => {
  let component: BusquedaProductoComponent;
  let fixture: ComponentFixture<BusquedaProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaProductoComponent]
    });
    fixture = TestBed.createComponent(BusquedaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
