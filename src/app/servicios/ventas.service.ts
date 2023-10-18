import { Injectable } from '@angular/core';
import { ProductoVenta } from '../clases/producto-venta';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  constructor(private firestore: Firestore) {}

  public async traerProductosVentasBd() {
    const productosCollection = collection(this.firestore, 'productosVenta');
    const query = await getDocs(productosCollection);
    const productos = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return productos;
  }

  public async guardarProductoVentaBD(producto: ProductoVenta) {
    try {
      const productosVentaCollection = collection(
        this.firestore,
        'productosVenta'
      );
      const productoData = {
        descripcion: producto.descripcion,
        tipo: producto.tipo,
        fechaDeVencimiento: producto.fechaDeVencimiento,
        precio: producto.precio,
        foto: producto.foto,
        fechaDeVenta: producto.fechaDeVenta,
        cantidad: producto.cantidad,
      };
      const docRef = await addDoc(productosVentaCollection, productoData);
      console.log('Producto de venta agregado con ID: ', docRef.id);
      return true;
    } catch (error) {
      console.error('Error al agregar el producto de venta: ', error);
      return false;
    }
  }
}
