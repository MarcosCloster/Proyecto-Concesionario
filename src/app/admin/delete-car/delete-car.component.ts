import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-car',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './delete-car.component.html',
  styleUrl: './delete-car.component.css'
})
export class DeleteCarComponent implements OnInit {
  carArray: Auto[] = [];
  filteredCars: Auto[] = []; // Lista filtrada
  filterText: string = ''; // Texto del filtro

  carServicio = inject(JsonService);

  ngOnInit(): void {
    this.getCarJson();
  }

  getCarJson() {
    this.carServicio.getJson().subscribe({
      next: (cars: Auto[]) => {
        this.carArray = cars;
        this.filteredCars = cars; // Inicialmente, muestra todos
        console.log(this.filteredCars)
        console.log(this.carArray)
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }

  filterCars() {
    const filter = this.filterText.toLowerCase();
    this.filteredCars = this.carArray.filter(car =>
      car.name.toLowerCase().includes(filter) || // Filtra por nombre
      car.description.toLowerCase().includes(filter) || // Filtra por descripción
      car.price.toString().includes(filter) || // Filtra por precio
      car.id?.toString().includes(filter) // Filtra por ID
    );
  }

  darDeBaja(car: Auto) {
    const updatedCar = { ...car, isActive: false };
    const indexFilter = this.filteredCars.findIndex(item => item.id == car.id)
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro de que desea eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'No, cancelar'
    }).then(result  => {
      if(result.isConfirmed){
        this.carServicio.putJson(updatedCar, car.id!.toString()).subscribe({
          next: (response: Auto) => {
            Swal.fire({
              title: '¡Éxito!',
              text: 'El auto ha sido eliminado correctamente.',
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
      text: 'No se pudo eliminar el auto. Por favor, intenta nuevamente.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}
