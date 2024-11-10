import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})

export class AddCarComponent {


  carService = inject(JsonService)
  route = inject(Router)
  carArray: Auto[] = []; 
  fb = inject(FormBuilder);

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

  formCar = this.fb.group({

    name: ['', [Validators.required, Validators.maxLength(50)]],
    brand: ['', [Validators.required, Validators.maxLength(20)]],
    model: ['', [Validators.required, Validators.maxLength(20)]],
    year: [0, [Validators.required, Validators.min(1970), Validators.max(new Date().getFullYear())]],
    fuel: ['', Validators.required],
    doors: [0, [Validators.required, Validators.min(3)]],
    kph: [0, [Validators.required, Validators.min(0)]],
    engine: ['', Validators.required],
    transmision: ['', Validators.required],
    traction: ['', Validators.required],
    color: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1000)]],
    photos: [''],
    description: ['', Validators.required],
  });


  


}
