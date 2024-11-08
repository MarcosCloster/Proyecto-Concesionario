import { Injectable } from '@angular/core';
import { Auto } from '../interfaces/autos';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private storageKey = 'shoppingCart';

  constructor() {}

  // Obtener los productos del carrito
  getCartItems(): any[] {
    const items = sessionStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }

  // Agregar un producto al carrito
  addToCart(product: any): void {
    const cartItems = this.getCartItems();
    cartItems.push(product);
    sessionStorage.setItem(this.storageKey, JSON.stringify(cartItems));
  }

  // Eliminar un producto del carrito por índice
  removeFromCart(index: number): void {
    const cartItems = this.getCartItems();
    if (index > -1) {
      cartItems.splice(index, 1);
      sessionStorage.setItem(this.storageKey, JSON.stringify(cartItems));
    }
  }

  // Limpiar el carrito
  clearCart(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}



