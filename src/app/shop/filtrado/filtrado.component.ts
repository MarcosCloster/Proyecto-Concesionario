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
      }  else if (params.get('tipo') === 'filter'){
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
  carArrayMarca: string[] = []

  mostrarMarcasFiltradas() {
    // Filtramos los autos activos (isActive = true)
    const autosActivos = this.carArray.filter(auto => auto.isActive);
  
    // Extraemos solo las marcas de los autos activos
    const marcasActivas = autosActivos.map(auto => auto.brand);
  
    // Eliminamos marcas duplicadas usando un Set
    this.carArrayMarca = [...new Set(marcasActivas)];
    console.log('Car Array', this.carArrayMarca)
  }

  getCarsByMarca(marca: string | null) {
    this.carService.getAutosByBrand(marca).subscribe({
      next: (autos: Auto[]) => {
        this.carArrayFiltrado = autos;
        this.filterCars(); // Filtrar después de asignar carArrayFiltrado
        this.mostrarMarcasFiltradas()
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }

  getCarsByFuel(fuel: string) {
    this.carService.getAutosByFuel(fuel).subscribe({
      next: (autos: Auto[]) => {
        this.carArrayFiltrado = autos;
        this.filterCars(); // Filtrar después de asignar carArrayFiltrado
      },
      error: console.log
    });
  }

  getCarByDescription(description: string) {
    this.carService.getAutosByDescription(description).subscribe({
      next: (autos: Auto[]) => {
        this.carArrayFiltrado = autos;
        this.filterCars(); // Filtrar después de asignar carArrayFiltrado
      },
      error: console.log
    });
  }

  getCars()
  {
    this.carService.getJson().subscribe({
      next: (autos: Auto[]) =>
      {
        this.carArray = autos;
        this.filterCars()
        this.encontrarMarca()

      },
      error: (e: Error) =>
      {
        console.log(e.message);
      }
        
    })
  }

  encontrarMarca() {
    this.marcaArray = [];
    const autosActivos = this.carArray.filter(auto => auto.isActive);
    for (let auto of autosActivos) {
      if (!this.marcaArray.includes(auto.brand)) {
        this.marcaArray.push(auto.brand);
      }
    }
  }

  filtrarPorMarca(marca: string)
  {
    this.carArray = this.carArray.filter(el => el.brand !== marca)
    console.log(this.carArray)
  }

  sortArray(tipo: string) {
    this.carService.getJson().subscribe({
      next: (autos) => {
        if (tipo === 'lowestPrice') {
          autos.sort((a, b) => a.price - b.price);
        } else if (tipo === 'highestPrice') {
          autos.sort((a, b) => b.price - a.price);
        } else if (tipo === 'name') {
          autos.sort((a, b) => a.name.localeCompare(b.name));
        }
  
        this.carArrayFiltrado = autos;
        this.filterCars();
      }
    });
  }

  filterCars() { 
    const cartItems = this.carritoService.getCartItems(); 
    this.carArrayFiltrado = this.carArrayFiltrado.filter(auto => !cartItems.some(item => item.id === auto.id)); 
  }
  
}
