import { Component, EventEmitter, Output } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css'],
})
export class ListadoProductosComponent {
  productos: any[] = [];

  productoSele: any = null;
  @Output() productoSeleccionado = new EventEmitter<any>();

  constructor(private authService: ProductosService) {}

  selectPeli(producto: any) {
    this.productoSele = producto;
    this.productoSeleccionado.emit(producto);
  }
  async ngOnInit() {
    try {
      const productosData = await this.authService.traerProductosBd();
      this.productos = productosData;
      console.log(this.productos);

      Swal.fire({
        icon: 'success',
        title: 'Productos',
        text: 'Cargando productos...',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        timer: 4000,
      });
    }
  }
}
