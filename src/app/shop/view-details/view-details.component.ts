import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auto } from 'src/app/interfaces/autos';
import { FooterComponent } from 'src/app/otherComponents/footer/footer.component';
import { HeaderComponent } from 'src/app/otherComponents/header/header.component';
import { CarritoService } from 'src/app/services/carrito.service';
import { JsonService } from 'src/app/services/json.service';


@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css'
})
export class ViewDetailsComponent implements OnInit{
  ngOnInit(): void {
    this.routes.paramMap.subscribe(params => {
      this.getCarByID(params.get('id'));
    })
  }

  car!: Auto

  routes = inject(ActivatedRoute)
  carService = inject(JsonService)

  getCarByID(id: string | null)
  {
    this.carService.getById(id).subscribe({
      next: (auto: Auto) => {
        this.car = auto
      }
    })
  }

  constructor(private cartService: CarritoService) {}

  addProductToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Producto agregado al carrito');
  }
}
