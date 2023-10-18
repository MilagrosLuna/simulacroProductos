import { Component, Input } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-borrar-producto',
  templateUrl: './borrar-producto.component.html',
  styleUrls: ['./borrar-producto.component.css'],
})
export class BorrarProductoComponent {
  @Input() producto: any;
  
  constructor(private authService: ProductosService) {}
 
  async eliminarProducto() {
    console.log(this.producto);
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al producto de la base de datos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmacion.isConfirmed) {
      const exito = await this.authService.eliminarProductoBD(this.producto.id);

      if (exito) {
        Swal.fire('Eliminado', 'El producto ha sido eliminado correctamente.', 'success');
      } else {
        Swal.fire('Error', 'Ha ocurrido un error al eliminar el producto.', 'error');
      }
    }
  }



}
