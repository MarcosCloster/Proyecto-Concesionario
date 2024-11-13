import { Component } from '@angular/core';
import { CarritoPaymentComponent } from "../../pay/carrito-payment/carrito-payment.component";

@Component({
  selector: 'app-carrito-payment-page',
  standalone: true,
  imports: [CarritoPaymentComponent],
  templateUrl: './carrito-payment-page.component.html',
  styleUrl: './carrito-payment-page.component.css'
})
export class CarritoPaymentPageComponent {

}
