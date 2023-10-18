import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { BorrarProductoComponent } from './components/borrar-producto/borrar-producto.component';
import { BusquedaProductoComponent } from './components/busqueda-producto/busqueda-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MostrarProductoComponent } from './components/mostrar-producto/mostrar-producto.component';
import { AltaProductoComponent } from './components/alta-producto/alta-producto.component';
import { AltaVentaComponent } from './components/alta-venta/alta-venta.component';
import { ProductosVentaComponent } from './components/productos-venta/productos-venta.component';
import { ListadoVentasComponent } from './components/listado-ventas/listado-ventas.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoProductosComponent,
    BorrarProductoComponent,
    BusquedaProductoComponent,
    MostrarProductoComponent,
    AltaProductoComponent,
    AltaVentaComponent,
    ProductosVentaComponent,
    ListadoVentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
