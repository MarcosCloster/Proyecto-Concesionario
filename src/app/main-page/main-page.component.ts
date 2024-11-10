import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../otherComponents/footer/footer.component';
import { HeaderComponent } from '../otherComponents/header/header.component';
import { JsonService } from '../services/json.service';
import { Auto } from '../interfaces/autos';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from '../carrito/carrito.component';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  sv = inject(JsonService)
  highlightCar: Auto[] = []
  carritoService = inject(CarritoService)
  filteredCarArray: Auto[] = [];
  carArray: Auto[] = []
  ngOnInit(): void {
    this.getAutos()
  }

  getAutos(){
    this.sv.getJson().subscribe({
      next: (auto: Auto[]) => {
        auto.reverse();
        let i = 0;
        let f = 0;
        this.carArray = auto
        this.filterCars()
        while(f != 5)
        {
          if(this.filteredCarArray[i].isActive)
          {
            this.highlightCar.push(this.filteredCarArray[i])
            f++
          }
          i++
        }
      },
      error: (error: Error) => {
        console.log(error)
      }
    })
  }

  filterCars() { 
    const cartItems = this.carritoService.getCartItems(); 
    this.filteredCarArray = this.carArray.filter(auto => !cartItems.some(item => item.id === auto.id)); 
  }

}
