import { Component, inject, OnInit } from '@angular/core';import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';

@Component({
  selector: 'app-activate-car',
  standalone: true,
  imports: [],
  templateUrl: './activate-car.component.html',
  styleUrl: './activate-car.component.css'
})
export class ActivateCarComponent implements OnInit {
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


  darDeAlta(car: Auto) {
    const updatedCar = { ...car, isActive: true };
    console.log(updatedCar);
    console.log(car.id);
  
    // Convierte el ID a string antes de pasarlo
    this.carServicio.putJson(updatedCar, car.id!.toString()).subscribe({
      next: (response: Auto) => {
        console.log(`Auto ${response.name} actualizado a inactivo`);
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }
}
