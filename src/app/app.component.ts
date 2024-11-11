import { Component } from '@angular/core';
import { HeaderComponent } from './otherComponents/header/header.component';
import { FooterComponent } from './otherComponents/footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ShopComponent } from './shop/shop.component';
import { RouterOutlet } from '@angular/router';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { AddCarComponent } from './admin/add-car/add-car.component';
import { UpdateCarComponent } from './admin/update-car/update-car.component';
import { PayComponent } from "./pay/pay.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MainPageComponent, ContactComponent, AboutUsComponent, ShopComponent, RouterOutlet, AdminViewComponent, AddCarComponent, UpdateCarComponent, PayComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DynamicDrive';
}
