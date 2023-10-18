export class Producto {
  id: number;
  descripcion: string;
  tipo: string;
  fechaDeVencimiento: string;
  precio: number;
  foto: string;

  constructor(
    descripcion: string,
    tipo: string,
    fechaDeVencimiento: string,
    precio: number,
    foto: string
  ) {
    this.id = -1;
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.fechaDeVencimiento = fechaDeVencimiento;
    this.precio = precio;
    this.foto = foto;
  }
}
