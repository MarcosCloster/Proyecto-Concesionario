import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../otherComponents/footer/footer.component';
import { HeaderComponent } from '../otherComponents/header/header.component';
import { JsonService } from '../services/json.service';
import { Auto } from '../interfaces/autos';
import { filter } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  ngOnInit(): void {
    this.getCars()
    
  }
  carArray: Auto[] = [];
  carService = inject(JsonService)
  marcaArray: string[] = []
  description : string[] = ['Usado', 'Nuevo']

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
    this.carArray = this.carArray.filter(el => el.brand !== marca)
    console.log(this.carArray)
  }
}
