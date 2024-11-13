import { Component } from '@angular/core';
import { ShopComponent } from "../../../shop/shop.component";

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [ShopComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css'
})
export class ShopPageComponent {

}
