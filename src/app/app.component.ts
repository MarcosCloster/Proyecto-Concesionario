import { Component } from '@angular/core';
import { HeaderComponent } from './otherComponents/header/header.component';
import { FooterComponent } from './otherComponents/footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ShopComponent } from './shop/shop.component';
import { RouterOutlet } from '@angular/router';
import { AdminViewComponent } from './admin-view/admin-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MainPageComponent, ContactComponent, AboutUsComponent, ShopComponent, RouterOutlet, AdminViewComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DynamicDrive';
}
