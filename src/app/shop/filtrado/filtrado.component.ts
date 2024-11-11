import { Component, inject, OnInit } from '@angular/core';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';
import { FooterComponent } from "../../otherComponents/footer/footer.component";
import { HeaderComponent } from "../../otherComponents/header/header.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { identifierName } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-filtrado',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule, CommonModule],
  templateUrl: './filtrado.component.html',
  styleUrl: './filtrado.component.css'
})
export class FiltradoComponent implements OnInit{

  ngOnInit(): void {
    
    this.routes.paramMap.subscribe(params => {
      if(params.get('tipo') == 'marca'){
        this.getCarsByMarca(params.get('info'))
      } else if(params.get('tipo') == 'type'){
        console.log('Hola')
        this.getCarByDescription(params.get('info')!)
      } else if(params.get('tipo') == 'fuel'){
        this.getCarsByFuel(params.get('info')!)
      } else if (params.get('precio') !== null && !isNaN(Number(params.get('precio')))){
        const precioParam = params.get('precio');
        const precio = precioParam ? +precioParam : 0; // Convierte a número y usa un valor por defecto
        this.filtrarPorPrecio(precio);
      } else if (params.get('tipo') === 'filter'){
        this.sortArray(params.get('info')!);
      }
      this.getCars()
    })
  }

  carArrayFiltrado: Auto[] = [];
  carArray: Auto[] = [];
  carService = inject(JsonService);
  routes = inject(ActivatedRoute);
  marcaArray: string[] = [];
  description : string[] = ['Usado', 'Nuevo'];
  carritoService = inject(CarritoService);
  filteredCarArray: Auto[] = [];


  getCarsByMarca(marca: string | null)
  {
    this.carService.getAutosByBrand(marca).subscribe({
      next: (autos: Auto[]) =>
      {
        
        
        this.filterCars()
        this.carArrayFiltrado = autos;
        this.encontrarMarca()
      },
      error: (e: Error) =>
      {
        console.log(e.message);
      }
    })
  }

  getCarsByFuel(fuel: string){
    this.carService.getAutosByFuel(fuel).subscribe({
      next: (autos: Auto[]) => {
        this.carArrayFiltrado = autos
      },
      error: console.log
    })
  }

  getCarByDescription(description: string){
    this.carService.getAutosByDescription(description).subscribe({
      next: (autos: Auto[]) => {
        this.carArrayFiltrado = autos
      },
      error : console.log
    })
  }

  getCars()
  {
    this.carService.getJson().subscribe({
      next: (autos: Auto[]) =>
      {
        this.carArray = autos;
        this.encontrarMarca()
        console.log(this.marcaArray)

      },
      error: (e: Error) =>
      {
        console.log(e.message);
      }
        
    })
  }

  encontrarMarca()
  {
    let i =0 ;
    for(let auto of this.carArray)
    {
  
      if(!this.marcaArray.find(el => el === auto.brand)){
        this.marcaArray.push(auto.brand)
      } 
    }
  }

  filtrarPorMarca(marca: string)
  {
    this.carArray = this.carArrayFiltrado.filter(el => el.brand !== marca)
    console.log(this.carArray)
  }

  filtrarPorPrecio(precio: number)
  {
    console.log('HOLA')
    console.log(this.carArray) 
    if (precio > 500000)
    {
      for(let car of this.carArray)
        {
          if(car.price > 500000)
          {
            this.carArrayFiltrado.push(car)
          }
        }
    } else if (precio < 500000 && precio > 200000)
    {
      for(let car of this.carArray)
        {
          if(car.price < 500000 && car.price > 200000)
          {
            this.carArrayFiltrado.push(car)
          }
        }
    } else if (precio < 200000 && precio > 50000)
    {
      for(let car of this.carArray)
        {
          if(car.price < 200000 && car.price > 50000)
          {
            this.carArrayFiltrado.push(car)
          }
        }
    } else if (precio < 50000)
    {
      for(let car of this.carArray)
      {
        if(car.price < 50000)
        {
          this.carArrayFiltrado.push(car)
          
        }
      }
      console.log('fadadjkfb')
      console.log(this.carArrayFiltrado)
    }
    
  }

  sortArray(tipo: string){
    this.carService.getJson().subscribe({
      next: (autos) => {
        if(tipo === 'lowestPrice'){
          console.log('Hola')
          autos.sort((a, b) => a.price - b.price)
        } else if(tipo === 'highestPrice'){
          console.log('Hola1')
          autos.sort((a, b) => b.price - a.price)
        } else if(tipo === 'name'){
          console.log('Hola2')
          autos.sort((a, b) => a.name.localeCompare(b.name))
        }
        
        this.carArrayFiltrado = autos
      }
    })
  }

  filterCars() { 
    const cartItems = this.carritoService.getCartItems(); 
    this.filteredCarArray = this.carArray.filter(auto => !cartItems.some(item => item.id === auto.id)); 
  }
  
}
