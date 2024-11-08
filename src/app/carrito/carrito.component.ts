import { Component, inject, OnInit } from '@angular/core';
import { Auto } from '../interfaces/autos';
import { CarritoService } from '../services/carrito.service';
import { FooterComponent } from '../otherComponents/footer/footer.component';
import { HeaderComponent } from '../otherComponents/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  cartItems: any[] = [];

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
  
}

