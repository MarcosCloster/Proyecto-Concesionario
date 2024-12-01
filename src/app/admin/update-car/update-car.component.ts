import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Auto } from 'src/app/interfaces/autos';
import { CarritoService } from 'src/app/services/carrito.service';
import { JsonService } from 'src/app/services/json.service';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [RouterModule, FormsModule, RouterLink, CommonModule],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css'
})
export class UpdateCarComponent implements OnInit{
  ngOnInit(): void {
    this.getCarJson()
  }

  
  carArrayFiltrado: Auto[] = [];
  carArray: Auto[] = [];
  routes = inject(ActivatedRoute);
  marcaArray: string[] = [];
  carritoService = inject(CarritoService);


  carServicio = inject(JsonService)


  addCar(car: Auto)
  {
    this.carArray.push(car);
  }

  getCarJson() {
    this.carServicio.getJson().subscribe({
      next: (autos: Auto[]) => {
        this.carArray = autos;
        this.mostrarMarcasFiltradas();
        this.applyFilters();
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }

  filters = {
    type: {
      Usado: false,
      Nuevo: false
    } as { [key: string]: boolean },
    brands: {} as Record<string, boolean>,
    fuel: {
      Diésel: false,
      Nafta: false,
      Gas: false
    } as Record<string, boolean>
  };

  mostrarMarcasFiltradas() {
    const autosActivos = this.carArray.filter(auto => auto.isActive);
    this.marcaArray = [...new Set(autosActivos.map(auto => auto.brand))];
    this.marcaArray.forEach(marca => this.filters.brands[marca] = false);
  }

  applyFilters() {
    let filteredCars = this.carArray.filter(auto => auto.isActive);
    const selectedTypes = Object.keys(this.filters.type).filter(
      type => this.filters.type[type]
    );
    if (selectedTypes.length > 0) {
      filteredCars = filteredCars.filter(auto => selectedTypes.includes(auto.description));
    }
    const selectedBrands = Object.keys(this.filters.brands).filter(
      brand => this.filters.brands[brand]
    );
    if (selectedBrands.length > 0) {
      filteredCars = filteredCars.filter(auto => selectedBrands.includes(auto.brand));
      
    }
    const selectedFuels = Object.keys(this.filters.fuel).filter(
      fuel => this.filters.fuel[fuel]
      
    );
    if (selectedFuels.length > 0) {
      filteredCars = filteredCars.filter(auto => selectedFuels.includes(auto.fuel));
    }

    this.carArrayFiltrado = filteredCars;
    console.log(this.carArrayFiltrado)
  }

  applySorting(sortType: string) {
    if (sortType === 'lowestPrice') {
      this.carArrayFiltrado.sort((a, b) => a.price - b.price);
    } else if (sortType === 'highestPrice') {
      this.carArrayFiltrado.sort((a, b) => b.price - a.price);
    } else if (sortType === 'name') {
      this.carArrayFiltrado.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  onApplyFilters() {
    this.applyFilters();
  }

}
