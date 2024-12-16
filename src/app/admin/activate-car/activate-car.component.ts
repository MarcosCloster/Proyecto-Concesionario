import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activate-car',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './activate-car.component.html',
  styleUrl: './activate-car.component.css'
})
export class ActivateCarComponent implements OnInit {
  ngOnInit(): void {
    this.getCarJson();
  }

  carArray: Auto[] = [];
  filteredCars: Auto[] = []; // Lista filtrada para mostrar en la interfaz
  filterText: string = ''; // Texto ingresado en la barra de búsqueda

  carServicio = inject(JsonService);

  addCar(car: Auto) {
    this.carArray.push(car);
  }

  getCarJson() {
    this.carServicio.getJson().subscribe({
      next: (cars: Auto[]) => {
        
        this.carArray = cars;
        this.filteredCars = cars; // Inicialmente, mostramos todos los autos
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }

  darDeAlta(car: Auto) {
    const updatedCar = { ...car, isActive: true };
    const indexFilter = this.filteredCars.findIndex(item => item.id == car.id)
    Swal.fire({
          title: 'Confirmación',
          text: '¿Está seguro de que desea dar de alta?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, enviar',
          cancelButtonText: 'No, cancelar'
    }).then(result => {
      if(result.isConfirmed){
        this.carServicio.putJson(updatedCar, car.id!.toString()).subscribe({
          next: (response: Auto) => {
            console.log(`Auto ${response.name} actualizado a activo`);
            Swal.fire({
              title: '¡Éxito!',
              text: 'El auto ha sido dado de alta correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.filteredCars.splice(indexFilter, 1)
              }
            });
          },
          error: (e: Error) => {
            console.log(e.message);
          }
        });
      } else{
        this.mostrarAlertaError();
      }
    })
    
  }

  mostrarAlertaError() {
    Swal.fire({
      title: '¡Error!',
      text: 'No se pudo agregar el auto. Por favor, intenta nuevamente.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  filterCars() {
    const filter = this.filterText.toLowerCase();
    this.filteredCars = this.carArray.filter(car =>
      car.name.toLowerCase().includes(filter) || // Filtra por nombre
      car.description.toLowerCase().includes(filter) || // Filtra por descripción
      car.price.toString().includes(filter) || // Filtra por precio
      car.id!.toString().includes(filter) // Filtra por ID
    );
  }
}
