import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auto } from 'src/app/interfaces/autos';
import { JsonService } from 'src/app/services/json.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, NgxDropzoneModule, CommonModule],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})

export class AddCarComponent {

  constructor(private uploadService: UploadService) {}

  carService = inject(JsonService)
  route = inject(Router)
  carArray: Auto[] = []; 
  fb = inject(FormBuilder);


  postCar(newCar: Auto) {
    
    this.carService.postJson(newCar).subscribe({
      next: (car: Auto) => {
        alert('Se ha agregado un auto');
        this.route.navigate(['/admin/view']);
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
    if (this.files.length === 0) {
      console.log("No hay archivos para cargar");
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
        alert('Subida exitosa a Cloudinary');
        
        const imageUrl = response.secure_url;
        const newCar = this.formCar.getRawValue() as Auto;
        newCar.photos = imageUrl 
        
        this.postCar(newCar);
      },
      error: (e: Error) => {
        console.error("Error en la subida:", e.message);
        alert("Ocurrió un error al subir la imagen. Verifica la configuración de Cloudinary.");
      }
    });
    return true;
  }

}
