import { Component, inject, OnInit } from '@angular/core';
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

export class AddCarComponent{


  carService = inject(JsonService)

  car: Auto = 
  {
    id: 0,
    name: '', 
    model: '',
    year: 0,
    fuel: 0,
    doors: 0,
    Kph: 0,
    engine: '',
    transmision: '',
    description: '',
    traction: '',
    price: 0,
    color: '',
    photos: ''
  }

  postCar ()
  {
    this.carService.postJson(this.car).subscribe(
      {
    
        next: (car: Auto) => {
          alert('Se ha agregado un auto')
        } ,
        error: (e: Error) => 
        {
          console.log(e.message)
        },
      })
    
  }


}
