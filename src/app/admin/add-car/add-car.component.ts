import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})

export class AddCarComponent {


  carService = inject(JsonService)
  route = inject(Router)
  carArray: Auto[] = []; 

  car: Auto = 
  {
    brand: '',
    name: '', 
    model: '',
    year: 0,
    fuel: '',
    doors: 0,
    kph: 0,
    engine: '',
    transmision: '',
    description: '',
    traction: '',
    price: 0,
    color: '',
    photos: '',
    isActive: true
  }

  postCar() {
    this.carService.getJson().subscribe({
      next: (cars: Auto[]) => {
        this.carArray = cars;
        this.carService.postJson(this.car).subscribe({
          next: (car: Auto) => {
            this.route.navigate(['/admin/view'])
            alert('Se ha agregado un auto');
          },
          error: (e: Error) => {
            console.log(e.message);
          },
        });
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }


  


}
