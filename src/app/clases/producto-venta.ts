import { Producto } from './producto';

export class ProductoVenta extends Producto {
  fechaDeVenta: string;
  cantidad: number;

  constructor(
    descripcion: string,
    tipo: string,
    fechaDeVencimiento: string,
    precio: number,
    foto: string,
    fechaDeVenta: string,
    cantidad: number
  ) {
    super(descripcion, tipo, fechaDeVencimiento, precio, foto);
    this.fechaDeVenta = fechaDeVenta;
    this.cantidad = cantidad;
  }
}
