import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})

export class AddCarComponent {


  carService = inject(JsonService)

  carArray: Auto[] = []; 

  car: Auto = 
  {
    id: "",
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
        console.log("LENGTH: ", this.carArray.length);
        
        let id: string;
        if (this.carArray.length === 0) {
          id = '1'; // Primera ID como string
        } else {
          const maxId = Math.max(...this.carArray.map(car => Number(car.id)));
          id = (maxId + 1).toString(); // Convertir a string
        }
  
        console.log("id Final:", id);
        this.car.id = id; // Asegurarse de que el id sea string
        console.log(this.car);
  
        this.carService.postJson(this.car).subscribe({
          next: (car: Auto) => {
            console.log('Respuesta del servidor:', car);
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
