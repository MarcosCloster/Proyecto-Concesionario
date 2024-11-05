import { Component, inject, OnInit } from '@angular/core';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';
import { FooterComponent } from "../../otherComponents/footer/footer.component";
import { HeaderComponent } from "../../otherComponents/header/header.component";
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-filtrado',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule],
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
      }
      this.getCars()
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

  
}
