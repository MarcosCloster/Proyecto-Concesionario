import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, NgxDropzoneModule, CommonModule],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})

export class AddCarComponent implements OnInit {

  // Monitorear los cambios en el campo 'kph' y actualizar 'description'
  ngOnInit() {
    this.formCar.get('kph')?.valueChanges.subscribe((kphValue) => {
      if (kphValue! > 0) {
        this.formCar.patchValue({ description: 'Usado' });
      } else {
        this.formCar.patchValue({ description: 'Nuevo' });
      }
    });
  }

  constructor(private uploadService: UploadService) {}

  carService = inject(JsonService)
  route = inject(Router)
  carArray: Auto[] = []; 
  fb = inject(FormBuilder);


  postCar(newCar: Auto) {
    this.carService.postJson(newCar).subscribe({
      next: (car: Auto) => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'El auto ha sido agregado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.route.navigate(['/admin/view']);
          }
        });
      },
      error: (e: Error) => {
        console.log(e.message);
        this.mostrarAlertaError();
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
    photos: [[]],
    description: ['', Validators.required],
  });


  files: File[] = [];

  setCar(car: Auto) { 
    this.formCar.patchValue({
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year , 
      fuel: car.fuel,
      doors: car.doors, 
      kph: car.kph, 
      engine: car.engine,
      transmision: car.transmision,
      traction: car.traction,
      color: car.color,
      price: car.price,
      description: car.description,
    });
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  upload() {
    if (this.formCar.invalid) {
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos requeridos antes de continuar.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }

    const newCar = this.formCar.getRawValue() as unknown as Auto;
    if(newCar.description === 'Usado' && newCar.kph === 0) 
    {
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Si un auto es Usado, no puede tener 0 km',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else if (newCar.description === 'Nuevo' && newCar.kph !== 0 )
    {
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Si un auto es nuevo, no puede tener mas de 0 km',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  
    if (this.files.length === 0) {
      Swal.fire({
        title: 'Sin archivos',
        text: 'Por favor, selecciona al menos un archivo para subir.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }
  
    const uploadedPhotos: string[] = [];
    const totalFiles = this.files.length;
  
    this.files.forEach((file, index) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'DynamicDrive');
      data.append('cloud_name', 'dbbhvsxue');
  
      this.uploadService.uploadImg(data).subscribe({
        next: (response: any) => {
          const imageUrl = response.secure_url;
          uploadedPhotos.push(imageUrl);
  
          // Si es el último archivo, guardar el auto con todas las imágenes
          if (uploadedPhotos.length === totalFiles) {
            
            newCar.photos = uploadedPhotos;
            newCar.isActive = true;
  
            this.postCar(newCar);
          }
        },
        error: (e: Error) => {
          console.error('Error en la subida:', e.message);
          this.mostrarAlertaError();
        }
      });
    });
  
    return true;
  }
  

  mostrarAlerta() {
    Swal.fire({
      title: '¡Éxito!',
      text: 'El auto ha sido agregado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  mostrarAlertaError() {
    Swal.fire({
      title: '¡Éxito!',
      text: 'Error! El auto no ha sido agregado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
}
