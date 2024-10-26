import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Asegúrate de tener esta importación

import { AppComponent } from './app.component';
import { HeaderComponent } from './otherComponents/header/header.component';
import { FooterComponent } from './otherComponents/footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ShopComponent } from './shop/shop.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: MainPageComponent }, 
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'shop', component: ShopComponent},
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
