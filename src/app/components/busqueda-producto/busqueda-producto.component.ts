import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-busqueda-producto',
  templateUrl: './busqueda-producto.component.html',
  styleUrls: ['./busqueda-producto.component.css'],
})
export class BusquedaProductoComponent  implements OnInit {
  filteredProd: any[] = [];
  productos: any[] = [];
  selectedProd: any = null;
  searchText: string = '';

  constructor(private authService: ProductosService) {}  

  @Output() prodSeleccionada = new EventEmitter<any>();

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
    this.prodSeleccionada.emit(prod);
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
