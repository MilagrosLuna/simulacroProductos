import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/clases/producto';
import Swal from 'sweetalert2';
import { ProductosService } from 'src/app/servicios/productos.service';
@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css'],
})
export class AltaProductoComponent {
  fotoDefautl: string =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXo6Oi7u7vU1NTDw8O+vr64uLjY2NjZ2dnf39/r6+vj4+Ph4eHd3d3n5+fOzs7FxcUKEHS5AAAEaUlEQVR4nO2dCZarIBBFxTEYlf3v9ickdtJfSIepqvC8u4A+3oZXBTikaQAAAAAAAAAAAAAAAAAAAAAAAAAAAACC0CFwX2woWs/LuBnTfYcx2zRXJXltTa8GFcCg+m3mvuxvWUcTZrdL9lMNw6jXto/Rezi23Jf/N2sbNXwvRemjuPQJepaFW+Ej65bqp1S3clt8YO5SJugTyVGck2eopRObxGsWvxtSu+IlzwgqsbXmmk1QjdwuTjJl8I7MUjNn8xNqmC+DQg2zCko0zFhkZBoG98HhTkWGgYJDv7XjMrb+HaQ0w8AMdsva3Fdlupl920hhhoGC7xevZ+NUlGUYWGSW34tqvbkURRkGZvDy/67BqSjJMGyKDq71phFtGFpkXPs+xyyQYxja6N2bouO5hxjD0Ebfu//MckiiFMPglczmOZyQOobBi23vdR9qjQzD8N3EMHn+lEzDiN3E4Dt9OZQaCYbXiGPRqsYwasPrvSHRyTOM3NEbt+Eqr1vEHln07vsRkzjD+JNt9zQ9LkyZDS/Rgko5/pw+DiGzYcqp2rAd/57rIJnVMO3Y8FhOV8fmidNQJ99d+q2o10OnYDaMafT/Xbx5f2Zmcs8IPsOUIvNiu6z2Aah5cs1QVsNMR/eD6sy2GeN/IoXJUOe9N/Hxf8BimF5kpBvmyaBgw/TngIQb0mWQx5AygzyG6Y1euCFlkWExpM0gvSFho39B+cQQdZF54DuVKwF5Bi0XQkGGKXqD7hFaJsGe6vlSngwq/02q7FA3+h+oCg1PkbnREz0iTLqb+IXn9D8zLI3+gfcuXGZBLj+q1y0YBWneCuLLoPcOVV74Mkizr2Br9A/KC/I1+jvDWD6FC6PfrRcW92MtMhTLGcZGb1lKz1HORq/uq5niIWQWLP8eN2+RUeXLKG+RIRBknqLlBWfORk9RZNxPRZBBsJRxvtpxJsGM77iGQ7EY1S3jEBL0wcbxFOvZBDknKcEUbbK/5ipPkK/bUxQZC9fBBU0G73DlkGoEG65aSijoflu1MGQZtDCUGlpBhnUptSB9raEWvM1T2kFk+CqbHgkVyafoQ3GiE+T6OiKZIssIUioyfhnR9ZpVdngy+FI8uSCBIrdgUzyL/IKut1YzIuLzqwVbv4ApaimWRbZGf6SQopARtBRRFJHBnQJZlJLBHT2eXDB7uZEn2GTOoqgM/pCx9csUzFdu5H5IPlMWRWZwJ0tFFTuClgyKsgXTsyg3gzuJrV90Bp8kKdYg2CRlUfwUfRKdxVoEY5+2kV9kXkRlsZIM7kQoVjSClmDF2gRDW39NGdwJymJlGXwSoFinYBOQxQqn6INvs1it4Jetv8Yi8+KLLFabwSd/K1Y9gpY/FOsX/JzFujO4o9vTZnDHm8VzjKDFo3geQc+un/sr3FlxlJsTTVHLIYtnKTJvXN5/VHXoy78/SM/a7r+7PVT0e9pB6HnaTN+bbazrN9GDqPN37QEAAAAAAAAAAAAAAAAAAAAAAAAAADgn/wC+h0RCe+wfzwAAAABJRU5ErkJggg==';
  form!: FormGroup;
  checkError: boolean = false;
  errorMessage: string = '';

  descripcion: string = '';
  tipo: string = '';
  fechaDeVencimiento: string = '';
  precio: number = -1;
  foto: string = '';

  tipos: string[] = ['Sólido', 'Líquido'];
  constructor(private authService: ProductosService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      descripcion: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      fechaDeVencimiento: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required,
        Validators.min(0),
        Validators.max(1000),]),
    });
  }
  async onSubmit() {
    if (this.form.valid) {
      const producto = new Producto(
        this.form.controls['descripcion'].value,
        this.form.controls['tipo'].value,
        this.form.controls['fechaDeVencimiento'].value,
        this.form.controls['precio'].value,
        this.fotoDefautl
      );
      const x = await this.authService.guardarProductoBD(producto);
      if (x) {
        Swal.fire({
          icon: 'success',
          title: 'Alta de producto exitosa',
          text: 'producto agregado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.form.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar el producto',
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
