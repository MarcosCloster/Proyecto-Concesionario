import { Component } from '@angular/core';
import { CarritoComponent } from "../../carrito/carrito.component";

@Component({
  selector: 'app-carrito-page',
  standalone: true,
  imports: [CarritoComponent],
  templateUrl: './carrito-page.component.html',
  styleUrl: './carrito-page.component.css'
})
export class CarritoPageComponent {

}
