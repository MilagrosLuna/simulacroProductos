import { Component, EventEmitter, Output } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-venta',
  templateUrl: './productos-venta.component.html',
  styleUrls: ['./productos-venta.component.css']
})
export class ProductosVentaComponent {
  filteredProd: any[] = [];
  productos: any[] = [];
  selectedProd: any = null;
  searchText: string = '';

  constructor(private authService: ProductosService) {}  

  @Output() productoSeleccionado = new EventEmitter<any>();

  async ngOnInit() {
    const productosData = await this.authService.traerProductosBd();
    this.productos = productosData;
    this.filteredProd = this.productos;
    Swal.fire({
      icon: 'success',
      title: 'Productos',
      text: 'Cargando productos...',
      showConfirmButton: false,
      timer: 1500,
    })
      .then(async () => {})
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          timer: 4000,
        });
      });
  }
  
  selectProd(prod: any) {
    this.selectedProd = prod;
    this.productoSeleccionado.emit(prod);
  }

  filterProds() {
    if (!this.searchText) {
      this.filteredProd = this.productos;
    } else {
      this.filteredProd = this.productos.filter((producto: any) =>
        producto.descripcion.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
}
