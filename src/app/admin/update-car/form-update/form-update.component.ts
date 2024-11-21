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

    // Monitorear los cambios en el campo 'kph' y actualizar 'description'

    this.formCar.get('kph')?.valueChanges.subscribe((kphValue) => {
      if (kphValue! > 0) {
        this.formCar.patchValue({ description: 'Usado' });
      } else {
        this.formCar.patchValue({ description: 'Nuevo' });
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
      description: car.description 
    });
  }
  
  originalPhotos: string[] = [];  // Variable para almacenar las fotos originales

// Obtener los datos del auto por ID
getCarByID(id: string | null) {
  this.carService.getById(id).subscribe({
    next: (car: Auto) => {
      this.originalPhotos = car.photos;  // Guardar las fotos originales
      this.setCar(car);  // Llenar el formulario con los datos del auto
    },
    error: (e: Error) => {
      console.log(e.message);
    }
  });
}

// Función para subir el auto
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

  // Verificar si el auto es usado o nuevo, y validar los km
  if (newCar.description === 'Usado' && newCar.kph === 0) {
    Swal.fire({
      title: 'Formulario incompleto',
      text: 'Si un auto es Usado, no puede tener 0 km',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return false;
  } else if (newCar.description === 'Nuevo' && newCar.kph !== 0) {
    Swal.fire({
      title: 'Formulario incompleto',
      text: 'Si un auto es nuevo, no puede tener más de 0 km',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return false;
  }

  // Si no se seleccionan archivos nuevos, mantener las fotos originales
  if (this.files.length === 0) {
    newCar.photos = this.originalPhotos;  // Mantener fotos originales si no se sube nada nuevo
    this.updateCar(newCar);
    return true;
  }

  // Si hay archivos seleccionados, los subimos
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

        // Si es el último archivo, guardar el auto con todas las fotos
        if (uploadedPhotos.length === totalFiles) {
          newCar.photos = [...this.originalPhotos, ...uploadedPhotos];  // Añadir las nuevas fotos a las originales
          this.updateCar(newCar);
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

  
  

  mostrarAlertaError() {
    Swal.fire({
      title: '¡Error!',
      text: 'No se pudo modificar el auto. Por favor, intenta nuevamente.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}
