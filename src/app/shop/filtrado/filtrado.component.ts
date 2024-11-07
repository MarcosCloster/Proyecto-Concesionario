import { Component, inject, OnInit } from '@angular/core';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';
import { FooterComponent } from "../../otherComponents/footer/footer.component";
import { HeaderComponent } from "../../otherComponents/header/header.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-filtrado',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule],
  templateUrl: './filtrado.component.html',
  styleUrl: './filtrado.component.css'
})
export class FiltradoComponent implements OnInit{

  ngOnInit(): void {
    this.getCars()
    this.routes.paramMap.subscribe(params => {
      if(params.get('tipo') == 'marca'){
        this.getCarsByMarca(params.get('info'))
      } else if(params.get('tipo') == 'type'){
        console.log('Hola')
        this.getCarByDescription(params.get('info')!)
      } else if(params.get('tipo') == 'fuel'){
        this.getCarsByFuel(params.get('info')!)
      } else if (params.get('precio') !== null && !isNaN(Number(params.get('precio'))))
      {
        const precioParam = params.get('precio');
        const precio = precioParam ? +precioParam : 0; // Convierte a número y usa un valor por defecto
        this.filtrarPorPrecio(precio);
      }
      
    })
  }

  carArrayFiltrado: Auto[] = [];
  carArray: Auto[] = []
  carService = inject(JsonService)
  routes = inject(ActivatedRoute)
  marcaArray: string[] = []
  description : string[] = ['Usado', 'Nuevo']

  getCarsByMarca(marca: string | null)
  {
    this.carService.getAutosByBrand(marca).subscribe({
      next: (autos: Auto[]) =>
      {
        this.carArrayFiltrado = autos;
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
    this.getCars()
    console.log(this.carArray) // aca me muestra que el array esta vacio
    if (precio > 500000)
    {
      
      this.carArrayFiltrado = this.carArray.filter(el => el.price > 500000)
      console.log(this.carArrayFiltrado)
    } else if (precio < 500000 && precio > 200000)
    {
      this.carArrayFiltrado = this.carArray.filter(el => el.price < 500000 && el.price > 200000)
      console.log('askldalskf', this.carArrayFiltrado)
    } else if (precio < 200000 && precio > 50000)
    {
      this.carArrayFiltrado = this.carArray.filter(el => el.price < 200000 && el.price > 50000)
      console.log(this.carArrayFiltrado)

    } else if (precio < 50000)
    {
      this.carArrayFiltrado = this.carArray.filter(el => el.price )
    }
    
  }
  
}