// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthGuard } from './auth/auth.guard';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ShopPageComponent } from './pages/shop-pages/shop-page/shop-page.component';
import { LoginPageComponent } from './pages/admin/login-page/login-page.component';
import { AdminViewPageComponent } from './pages/admin/admin-view-page/admin-view-page.component';
import { AddCarPageComponent } from './pages/admin/add-car-page/add-car-page.component';
import { UpdateCarPageComponent } from './pages/admin/update-car-page/update-car-page.component';
import { DeleteCarPageComponent } from './pages/admin/delete-car-page/delete-car-page.component';
import { FiltradoPageComponent } from './pages/shop-pages/filtrado-page/filtrado-page.component';
import { ViewDetailsPageComponent } from './pages/shop-pages/view-details-page/view-details-page.component';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';
import { ActivateCarPageComponent } from './pages/admin/activate-car-page/activate-car-page.component';
import { CarritoPaymentPageComponent } from './pages/carrito-payment-page/carrito-payment-page.component';
import { PayPageComponent } from './pages/pay-page/pay-page.component';
import { FromUpdatePageComponent } from './pages/admin/from-update-page/from-update-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'about', component: AboutUsPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'shop', component: ShopPageComponent },
  { path: 'admin', component: LoginPageComponent},
  { path: 'admin/view', component: AdminViewPageComponent, canActivate: [AuthGuard]},
  { path: 'admin/add', component: AddCarPageComponent, canActivate: [AuthGuard] },
  { path: 'admin/update', component: UpdateCarPageComponent, canActivate: [AuthGuard]},
  { path: 'admin/delete', component: DeleteCarPageComponent, canActivate: [AuthGuard]},
  { path: 'shop/:info/:tipo', component: FiltradoPageComponent},
  { path: 'shop/:precio', component: FiltradoPageComponent},
  { path: 'detail/:id', component: ViewDetailsPageComponent},
  { path: 'update/:id', component: FromUpdatePageComponent },
  { path: 'carrito', component: CarritoPageComponent},
  { path: 'admin/activate', component: ActivateCarPageComponent},
  { path: 'carrito/payment', component: CarritoPaymentPageComponent},
  { path: 'payment/:id', component: PayPageComponent},
  { path: '**', redirectTo: '' }
];
