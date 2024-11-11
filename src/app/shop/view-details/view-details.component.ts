import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auto } from 'src/app/interfaces/autos';
import { FooterComponent } from 'src/app/otherComponents/footer/footer.component';
import { HeaderComponent } from 'src/app/otherComponents/header/header.component';
import { CarritoService } from 'src/app/services/carrito.service';
import { JsonService } from 'src/app/services/json.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, RouterLink],
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
  router = inject(Router)

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
    // Mostrar la alerta de error antes de agregar el producto al carrito
    Swal.fire({
      title: '¡Éxito!',
      text: 'Se agregó el auto al carrito',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.addToCart(product);
        this.router.navigateByUrl("/shop")
      }
    });
  }

  mostrarAlertaError() {
    Swal.fire({
      title: '¡Error!',
      text: 'No se pudo agregar el auto al carrito. Por favor, intenta nuevamente.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
  redirection() {
    window.open('https://wa.me/5492236566864?text=Hola+como+estas?', '_blank');
  }

  
  
  
}

