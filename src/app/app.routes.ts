import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductFormEditComponent } from './components/product-form-edit/product-form-edit.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent},
  { path: 'agregar', component: ProductFormComponent},
  { path: 'editar/:id', component: ProductFormEditComponent}
];
