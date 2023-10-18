import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosVentaComponent } from './productos-venta.component';

describe('ProductosVentaComponent', () => {
  let component: ProductosVentaComponent;
  let fixture: ComponentFixture<ProductosVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosVentaComponent]
    });
    fixture = TestBed.createComponent(ProductosVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
