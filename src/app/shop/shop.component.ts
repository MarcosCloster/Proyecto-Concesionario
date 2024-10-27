import { Component } from '@angular/core';
import { FooterComponent } from '../otherComponents/footer/footer.component';
import { HeaderComponent } from '../otherComponents/header/header.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

}
