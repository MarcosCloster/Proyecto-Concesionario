// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { AddCarComponent } from './admin/add-car/add-car.component';
import { UpdateCarComponent } from './admin/update-car/update-car.component';
import { DeleteCarComponent } from './admin/delete-car/delete-car.component';
import { FormUpdateComponent } from './admin/update-car/form-update/form-update.component';
import { ActivateCarComponent } from './admin/activate-car/activate-car.component';
import { FiltradoComponent } from './shop/filtrado/filtrado.component';
import { ViewDetailsComponent } from './shop/view-details/view-details.component';
import { CarritoComponent } from './carrito/carrito.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'admin', component: AdminViewComponent },
  { path: 'admin/add', component: AddCarComponent },
  { path: 'admin/update', component: UpdateCarComponent},
  { path: 'admin/delete', component: DeleteCarComponent},
  { path: 'shop/:info/:tipo', component: FiltradoComponent},
  { path: 'shop/:precio', component: FiltradoComponent},
  { path: 'detail/:id', component: ViewDetailsComponent},
  { path: 'update/:id', component: FormUpdateComponent },
  { path: 'carrito', component: CarritoComponent},
  { path: 'admin/activate', component: ActivateCarComponent},
  { path: '**', redirectTo: '' }
];
