import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Auto } from '../interfaces/autos';
import { CarritoService } from '../services/carrito.service';
import { FooterComponent } from '../otherComponents/footer/footer.component';
import { HeaderComponent } from '../otherComponents/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{

  cartItems: Auto[] = [];
  router = inject(Router)
  totalPrice: number = 0;
  constructor(private cartService: CarritoService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
    this.precioTotal();
    console.log(this.cartItems)
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
    this.loadCartItems();
  }

  clearCart() {
    if(this.cartItems.length === 0)
    {
      Swal.fire({
        title: 'Error al Borrar',
        text: 'No hay autos en el carrito',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
    this.cartService.clearCart();
    this.loadCartItems();
  }

  sendCarrito()
  {
    if(this.cartItems.length > 0)
    {
      this.router.navigateByUrl('/carrito/payment')
    } else
    {
      Swal.fire({
        title: 'Error al Reservar',
        text: 'No hay autos en el carrito',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
    
  }

  precioTotal()
  {
    let sum=0;
    for(let cart of this.cartItems)
    {
      console.log('price', cart.price)
      sum += cart.price
    }
    this.totalPrice = sum;
  }
  
}

