import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { BusquedaProductoComponent } from './components/busqueda-producto/busqueda-producto.component';
import { AltaProductoComponent } from './components/alta-producto/alta-producto.component';
import { AltaVentaComponent } from './components/alta-venta/alta-venta.component';
import { ListadoVentasComponent } from './components/listado-ventas/listado-ventas.component';
const routes: Routes = [
  {
    path: 'productos',
    component: ListadoProductosComponent,
  },
  { path: 'alta', component: AltaProductoComponent },
  { path: 'busqueda', component: BusquedaProductoComponent },

  { path: 'ventas/nueva', component: AltaVentaComponent },
  { path: 'ventas/listado', component: ListadoVentasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
