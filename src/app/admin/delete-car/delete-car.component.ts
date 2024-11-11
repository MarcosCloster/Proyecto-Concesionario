import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-delete-car',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './delete-car.component.html',
  styleUrl: './delete-car.component.css'
})
export class DeleteCarComponent implements OnInit{
  ngOnInit(): void {
    this.getCarJson()
  }

  carArray: Auto[] = []; 

  carServicio = inject(JsonService)


  addCar(car: Auto)
  {
    this.carArray.push(car);
  }

  getCarJson()
  {
    this.carServicio.getJson().subscribe(
    {
      next: (cars: Auto[]) => 
      {
        this.carArray = cars
      },
      error: (e: Error) =>
      {
        console.log(e.message)
      }
    })
  }


  darDeBaja(car: Auto) {
    const updatedCar = { ...car, isActive: false };
    console.log(updatedCar);
    console.log(car.id);
  
    this.carServicio.putJson(updatedCar, car.id!.toString()).subscribe({
      next: (response: Auto) => {
        console.log(`Auto ${response.name} actualizado a inactivo`);
        
        Swal.fire({
          title: '¡Éxito!',
          text: 'El auto ha sido eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(); 
          }
        });
      },
      error: (e: Error) => {
        console.log(e.message);
        this.mostrarAlertaError();
      }
    });
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
