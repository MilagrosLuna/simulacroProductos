import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from '@angular/fire/firestore';
import { Producto } from '../clases/producto';
@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private firestore: Firestore) {}
  public async traerProductosBd() {
    const productosCollection = collection(this.firestore, 'productos');
    const query = await getDocs(productosCollection);
    const productos = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }; 
    });
    return productos;
  }
  public async eliminarProductoBD(productoId: string) {
    try {
      const productoDocRef = doc(this.firestore, 'productos', productoId);
      await deleteDoc(productoDocRef);
      return true; 
    } catch (error) {
      console.error('Error al eliminar el producto: ', error);
      return false; 
    }
  }
  public async guardarProductoBD(producto: Producto) {
    try {
      const productosCollection = collection(this.firestore, 'productos');
      const productoData = {
        descripcion: producto.descripcion,
        tipo: producto.tipo,
        fechaDeVencimiento: producto.fechaDeVencimiento,
        precio: producto.precio,
        foto: producto.foto,
      };
      const docRef = await addDoc(productosCollection, productoData);
      console.log('Producto agregado con ID: ', docRef.id);
      return true;
    } catch (error) {
      console.error('Error al agregar el producto: ', error);
      return false;
    }
  }
}
