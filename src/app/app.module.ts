import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AddCarComponent } from './admin/add-car/add-car.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@NgModule({
  declarations:[],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule ],
  providers: [],
})
export class AppModule { }
