import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-form-update',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, NgxDropzoneModule],
  templateUrl: './form-update.component.html',
  styleUrl: './form-update.component.css'
})
export class FormUpdateComponent implements OnInit{
  fb = inject(FormBuilder)
  carService = inject(JsonService)
  route = inject(ActivatedRoute)
  router = inject(Router); 
  uploadService = inject(UploadService)
  
  files: File[] = [];
  id: string | null = '';


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getCarByID(this.id);
    })
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
      photos: car.photos
    });
  }
  
  getCarByID(id: string | null) {
    this.carService.getById(id).subscribe({
      next: (car: Auto) => {
        this.setCar(car);

      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }
  

  updateCar(car: Auto) {
    car.isActive = true;
    this.carService.putJson(car, this.id).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'El auto ha sido actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Navegar a la ruta solo después de que el usuario haga clic en "Aceptar"
            this.router.navigate(['/admin/update']);
          }
        });
      },
      error: (e: Error) => {
        console.log(e.message);
        this.mostrarAlertaError();
      }
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
    if (this.files.length === 0) {
      const newCar = this.formCar.getRawValue() as Auto;
        this.updateCar(newCar);
      return false;
    }
  
    const file_data = this.files[0];
    const data = new FormData();
  
    data.append('file', file_data);
    data.append('upload_preset', 'DynamicDrive');
    data.append('cloud_name', 'dbbhvsxue');
  
    this.uploadService.uploadImg(data).subscribe({
      next: (response: any) => {
        console.log(response);
        Swal.fire({
          title: '¡Éxito!',
          text: 'Imagen subida exitosamente a Cloudinary.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
  
        const imageUrl = response.secure_url;
  
        const newCar = this.formCar.getRawValue() as Auto;
        newCar.photos = imageUrl;
  
        this.updateCar(newCar);
      },
      error: (e: Error) => {
        console.error("Error en la subida:", e.message);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al subir la imagen. Verifica la configuración de Cloudinary.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
    return true;
  }

  mostrarAlertaError() {
    Swal.fire({
      title: '¡Error!',
      text: 'No se pudo modificar el auto. Por favor, intenta nuevamente.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}
