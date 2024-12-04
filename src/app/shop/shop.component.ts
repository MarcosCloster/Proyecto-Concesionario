import { Component, inject, OnInit } from '@angular/core';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';
import { FooterComponent } from "../otherComponents/footer/footer.component";
import { HeaderComponent } from "../otherComponents/header/header.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoService } from 'src/app/services/carrito.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  carArrayFiltrado: Auto[] = [];
  carArray: Auto[] = [];
  carService = inject(JsonService);
  routes = inject(ActivatedRoute);
  marcaArray: string[] = [];
  carritoService = inject(CarritoService);
  
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

  ngOnInit(): void {
    this.getCars();
    
    // Leer los parámetros de consulta
    this.routes.queryParams.subscribe(params => {
      const type = params['type'];
      if (type) {
        // Aplicar filtro automáticamente
        this.filters.type[type] = true;
        this.applyFilters();
      }
    });
  }

  getCars() {
    this.carService.getJson().subscribe({
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