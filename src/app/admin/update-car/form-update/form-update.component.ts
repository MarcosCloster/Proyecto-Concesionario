import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';

@Component({
  selector: 'app-form-update',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './form-update.component.html',
  styleUrl: './form-update.component.css'
})
export class FormUpdateComponent implements OnInit{
  fb = inject(FormBuilder)
  carService = inject(JsonService)
  route = inject(ActivatedRoute)
  router = inject(Router); // Inyectar el Router

  

  id: string | null = '';


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getCarByID(this.id);
    })
  }


  formProduct = this.fb.group({

    nombre: ['', Validators.required],
    model: ['', Validators.required],
    year: [0, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]], // Asegúrate de establecer un valor por defecto
    fuel: ['', Validators.required],
    doors: [0, [Validators.required, Validators.min(1)]],
    kph: [0, Validators.required],
    engine: ['', Validators.required],
    transimision: ['', Validators.required],
    traction: ['', Validators.required],
    color: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    photos: [''],
    description: ['', Validators.required],
  });
  


  setProduct(car: Auto) {
    console.log("SET", car); 
    this.formProduct.patchValue({
      nombre: car.name,
      model: car.model,
      year: car.year || 0, // Asignar 0 si es undefined
      fuel: car.fuel,
      doors: car.doors || 0, // Asignar 0 si es undefined
      kph: car.Kph || 0, // Asignar 0 si es undefined
      engine: car.engine,
      transimision: car.transmision,
      traction: car.traction,
      color: car.color,
      price: car.price || 0, // Asignar 0 si es undefined
      description: car.description,
    });
  }
  
  
  getCarByID(id: string | null) {
    this.carService.getById(id).subscribe({
      next: (car: Auto) => {
        console.log('Auto obtenido:', car); // Verifica la estructura aquí
        this.setProduct(car);
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }
  

  updateCar ()
  {
    const car = this.formProduct.getRawValue() as unknown as Auto

    console.log('jkdjkdz', car)
    this.carService.putJson(car, this.id).subscribe
    ({
     next: () => {
      this.router.navigate(['/admin'])
      alert('Tarea actualizada')
     } ,
     error: (e: Error) => {
      console.log(e.message)
     }
    })
  }
}
