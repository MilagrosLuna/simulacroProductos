import { Component } from '@angular/core';
import { VentasService } from 'src/app/servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-ventas',
  templateUrl: './listado-ventas.component.html',
  styleUrls: ['./listado-ventas.component.css'],
})
export class ListadoVentasComponent {
  productos: any[] = [];

  productoSele: any = null;

  constructor(private authService: VentasService) {}

  selectPeli(producto: any) {
    this.productoSele = producto;
  }

  async ngOnInit() {
    try {
      const productosData = await this.authService.traerProductosVentasBd();
      this.productos = productosData;
      console.log(this.productos);

      Swal.fire({
        icon: 'success',
        title: 'Ventas',
        text: 'Cargando Ventas...',
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
