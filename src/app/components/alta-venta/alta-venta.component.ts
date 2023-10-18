import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoVenta } from 'src/app/clases/producto-venta';
import Swal from 'sweetalert2';
import { VentasService } from 'src/app/servicios/ventas.service';
@Component({
  selector: 'app-alta-venta',
  templateUrl: './alta-venta.component.html',
  styleUrls: ['./alta-venta.component.css'],
})
export class AltaVentaComponent {
  form!: FormGroup;
  checkError: boolean = false;
  errorMessage: string = '';
  cantidad: number = 0;
  fechaDeVenta: string = '';
  tipos: string[] = ['Sólido', 'Líquido'];
  selectedProd: any = null;

  constructor(private authService: VentasService) {}

  async OnProdSelected(prod: any) {
    this.selectedProd = prod;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      fechaDeVenta: new FormControl('', [Validators.required]),
      cantidad: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      const producto = new ProductoVenta(
        this.selectedProd.descripcion,
        this.selectedProd.tipo,
        this.selectedProd.fechaDeVencimiento,
        this.selectedProd.precio,
        this.selectedProd.foto,
        this.form.controls['fechaDeVenta'].value,
        this.form.controls['cantidad'].value
      );
      const x = await this.authService.guardarProductoVentaBD(producto);
      if (x) {
        Swal.fire({
          icon: 'success',
          title: 'Alta de producto de venta exitosa',
          text: 'Producto de venta agregado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.form.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar el producto de venta',
          text: this.errorMessage,
          timer: 4000,
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error complete los datos!!',
        timer: 2500,
      });
    }
  }
}
