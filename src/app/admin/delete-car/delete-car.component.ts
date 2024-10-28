import { Component, inject, OnInit } from '@angular/core';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';

@Component({
  selector: 'app-delete-car',
  standalone: true,
  imports: [],
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
  
    // Convierte el ID a string antes de pasarlo
    this.carServicio.putJson(updatedCar, car.id.toString()).subscribe({
      next: (response: Auto) => {
        console.log(`Auto ${response.name} actualizado a inactivo`);
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }
  


}
