import { Component, inject, OnInit } from '@angular/core';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';
import { FooterComponent } from "../../otherComponents/footer/footer.component";
import { HeaderComponent } from "../../otherComponents/header/header.component";
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtrado',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './filtrado.component.html',
  styleUrl: './filtrado.component.css'
})
export class FiltradoComponent implements OnInit{
  ngOnInit(): void {
    this.routes.paramMap.subscribe(params => {
      this.getCarsByID(params.get('marca'))
    })
    
  }
  carArray: Auto[] = [];
  carService = inject(JsonService)
  routes = inject(ActivatedRoute)

  getCarsByID(marca: string | null)
  {
    this.carService.getJson().subscribe({
      next: (autos: Auto[]) =>
      {
        this.carArray = autos;
      },
      error: (e: Error) =>
      {
        console.log(e.message);
      }
        
    })
  }

  filtrarPorMarca(marca: string)
  {
    this.carArray = this.carArray.filter(el => el.brand !== marca)
    console.log(this.carArray)
  }
}
