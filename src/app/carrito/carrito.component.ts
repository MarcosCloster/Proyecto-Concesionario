import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Auto } from '../interfaces/autos';
import { CarritoService } from '../services/carrito.service';
import { FooterComponent } from '../otherComponents/footer/footer.component';
import { HeaderComponent } from '../otherComponents/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
  constructor(private cartService: CarritoService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems)
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
    this.loadCartItems();
  }

  clearCart() {
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
      alert('No se puede pagar por un carrito vacio')
    }
    
  }
  
}

