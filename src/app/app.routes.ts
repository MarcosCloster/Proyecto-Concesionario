// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthGuard } from './auth/auth.guard';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { AddCarComponent } from './admin/add-car/add-car.component';
import { UpdateCarComponent } from './admin/update-car/update-car.component';
import { DeleteCarComponent } from './admin/delete-car/delete-car.component';
import { ViewDetailsComponent } from './shop/view-details/view-details.component';
import { FormUpdateComponent } from './admin/update-car/form-update/form-update.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ActivateCarComponent } from './admin/activate-car/activate-car.component';
import { CarritoPaymentComponent } from './pay/carrito-payment/carrito-payment.component';
import { PayComponent } from './pay/pay.component';
import { ViewDateComponent } from './admin/view-date/view-date.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'admin', component: LoginComponent},
  { path: 'admin/view', component: AdminViewComponent, canActivate: [AuthGuard]},
  { path: 'admin/add', component: AddCarComponent, canActivate: [AuthGuard] },
  { path: 'admin/update', component: UpdateCarComponent, canActivate: [AuthGuard]},
  { path: 'admin/delete', component: DeleteCarComponent, canActivate: [AuthGuard]},
  { path: 'detail/:id', component: ViewDetailsComponent},
  { path: 'update/:id', component: FormUpdateComponent },
  { path: 'carrito', component: CarritoComponent},
  { path: 'admin/activate', component: ActivateCarComponent},
  { path: 'admin/reservas', component: ViewDateComponent},
  { path: 'carrito/payment', component: CarritoPaymentComponent},
  { path: 'payment/:id', component: PayComponent},
  { path: '**', redirectTo: '' }
];
