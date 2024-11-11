import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../otherComponents/footer/footer.component';
import { HeaderComponent } from '../otherComponents/header/header.component';
import { JsonService } from '../services/json.service';
import { Auto } from '../interfaces/autos';
import { filter } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule, CommonModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  carArray: Auto[] = [];
  carService = inject(JsonService)
  filteredCarArray: Auto[] = [];
  marcaArray: string[] = []
  description : string[] = ['Usado', 'Nuevo']
  carritoService = inject(CarritoService)

  ngOnInit(): void {
    this.getCars()
  }

  getCars()
  {
    this.carService.getJson().subscribe({
      next: (autos: Auto[]) =>
      {
        this.carArray = autos;
        this.filterCars()
        this.encontrarMarca()
        console.log(this.filteredCarArray)
      },
      error: (e: Error) =>
      {
        console.log(e.message);
      }
        
    })
  }

  encontrarMarca() {
    this.marcaArray = [];
    const autosActivos = this.filteredCarArray.filter(auto => auto.isActive);
  
    for (let auto of autosActivos) {
      if (!this.marcaArray.includes(auto.brand)) {
        this.marcaArray.push(auto.brand);
      }
    }
  }

  filterCars() { 
    const cartItems = this.carritoService.getCartItems(); 
    this.filteredCarArray = this.carArray.filter(auto => !cartItems.some(item => item.id === auto.id)); 
  }

  filtrarPorMarca(marca: string)
  {
    this.carArray = this.carArray.filter(el => el.brand !== marca)
    console.log(this.carArray)
  }
}
