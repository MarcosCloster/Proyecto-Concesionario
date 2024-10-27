import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AddCarComponent } from './admin/add-car/add-car.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';

@NgModule({
  declarations:[
    AdminViewComponent,
    AddCarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
})
export class AppModule { }
