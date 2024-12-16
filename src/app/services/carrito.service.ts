import { Injectable } from '@angular/core';
import { Auto } from '../interfaces/autos';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private storageKey = 'shoppingCart';

  constructor() {}

  getCartItems(): any[] {
    const items = sessionStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }

    addToCart(product: any): void {
      const cartItems = this.getCartItems();
      cartItems.push(product);
      sessionStorage.setItem(this.storageKey, JSON.stringify(cartItems));
    }


    removeFromCart(index: number): void {
      const cartItems = this.getCartItems();
      if (index > -1) {
          cartItems.splice(index, 1);
          sessionStorage.setItem(this.storageKey, JSON.stringify(cartItems));
      }
    }

    clearCart(): void {
        sessionStorage.removeItem(this.storageKey);
    }

    isInCart(auto: Auto): boolean 
    { 
      const cartItems = this.getCartItems(); 
      return cartItems.some(item => item.id === auto.id); 
    }

}



