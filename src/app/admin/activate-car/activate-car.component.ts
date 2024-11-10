import { Component, inject, OnInit } from '@angular/core';import { RouterLink } from '@angular/router';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';

@Component({
  selector: 'app-activate-car',
  standalone: true,
  imports: [RouterLink],
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
    this.carServicio.putJson(updatedCar, car.id!.toString()).subscribe({
      next: (response: Auto) => {
        console.log(`Auto ${response.name} actualizado a inactivo`);
        window.location.reload();
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }
}
