import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Auto } from '../interfaces/autos';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonService } from '../services/json.service';
import { HeaderComponent } from "../otherComponents/header/header.component";
import { FooterComponent } from "../otherComponents/footer/footer.component";
import { DateService } from '../services/date.service';
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser';
import { Reserva } from '../interfaces/reserva';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent implements OnInit{
  reservedDates: Reserva[] = [];

    ngOnInit(): void {
      this.routes.paramMap.subscribe(params => {
        this.getCarByID(params.get('id'))
        this.getFechas();

      })
    }
    reservationService = inject(DateService)
    routes = inject(ActivatedRoute)
    carService = inject(JsonService)
    fb = inject(FormBuilder)
    car!: Auto;
    selectedDate: string = '';
    selectedTime: string = '';
    availableTimes: string[] = [];

  cardNumber: string = '';
  cardName: string = '';
  expiryDate: string = '';
  cvv: string = '';
  router = inject(Router)

  
    makeReservation() {
      if (this.selectedTime) {
        alert(`Reserva realizada para el ${this.selectedDate} a las ${this.selectedTime}`);
      }
    }

    processPayment() {
      if (this.cardNumber && this.cardName && this.expiryDate && this.cvv) {
        alert('Pago procesado exitosamente');
      } else {
        alert('Por favor, complete todos los campos de pago');
      }
    }

    getCarByID (id: string | null)
    {
      this.carService.getById(id).subscribe({
        next: (car: Auto) =>
        {
          this.car = car;
        },
        error: (e: Error) => 
        {
          console.log(e.message)
        }
      })
    }

    updateCar()
    {
      this.car.isActive = false;
      this.carService.putJson(this.car, this.car.id!).subscribe({
        next: () =>
        {
          console.log('Auto modificado')
        },
        error: (e: Error) => 
        {
          console.log(e.message)
        }
      })
    }

    expiracyDateValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (control.value) {
          const inputDate = new Date(control.value);
          const currentDate = new Date();
    
          const inputYear = inputDate.getFullYear();
          const inputMonth = inputDate.getMonth() + 1; 
    
          if (inputYear < 2025) {
            return { minYear: 'El año de expiración debe ser 2025 o posterior' };
          }
        }
    
        return null;
      };
    }
    
    cvvLengthValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value ? control.value.toString() : '';
        if (value.length === 3) {
          return null;
        } else {
          return { invalidCvvLength: true };
        }
      };
    }

    cardLengthValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value ? control.value.toString() : '';
        if (value.length === 16) {
          return null;
        } else {
          return { invalidCardLength: true }; 
        }
      };
    }

    form = this.fb.group({
      email: ['', Validators.required],
      reservationDate: ['', [Validators.required,  this.DateValidator()]],
      titular: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, this.cardLengthValidator()]],
      cardName: ['', [Validators.required]],
      name: '',
      price: '',
      expiracyDate: ['', [Validators.required, this.expiracyDateValidator()]],
      cvv: ['', [Validators.required, this.cvvLengthValidator()]]
    });

    reserva: Reserva = {
      idAuto: [],
      fecha: '',
      email: '',
      nombre: ''
    }

    confirmSubmit() {
      const formData = this.reserva;
      console.log(formData);
    
      const selectedDate = this.form.get('reservationDate')?.value;
      if (this.isDateReserved(selectedDate!)) {
        Swal.fire({
          title: '¡Error!',
          text: '¡Esta fecha ya está reservada! Elija otra fecha.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
    
      if (this.form.invalid) {
        Swal.fire({
          title: '¡Error!',
          text: 'Por favor, complete todos los campos del formulario.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
    
      Swal.fire({
        title: 'Confirmación',
        text: '¿Está seguro de que desea enviar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, enviar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.postReservationDate();
          this.updateCar();
          this.send().then(() => {
            Swal.fire({
              title: '¡Reserva pagada!',
              text: 'La reserva se ha realizado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.router.navigateByUrl('/');
            });
          }).catch((error) => {
            Swal.fire({
              title: 'Error al enviar',
              text: 'Hubo un problema al enviar la reserva. Intente de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.error('Error en el envío:', error);
          });
        } else {
          console.log('El usuario canceló la acción');
        }
      });
    }

    setValues(){
      this.reserva.fecha = this.form.get('reservationDate')!.value ?? ''
      this.reserva.email = this.form.get('email')!.value ?? ''
      this.reserva.idAuto.push(this.car.id!)
      this.reserva.nombre = this.form.get('titular')!.value ?? ''
    }

  postReservationDate()
  {
    this.setValues()
    this.reservationService.saveReservation(this.reserva).subscribe({
      next: () =>
      {
        console.log('Se guardo')
      },
      error: (e: Error) =>
      {
        console.log(e.message)
      }
    })
  }

  getFechas(): void {
    this.reservationService.getReservation().subscribe({
      next: (reservas) => {
        this.reservedDates = reservas
      }
    });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; 
  }

  isDateReserved(date: string | null): boolean {
    if (!date) return false;
    const formattedDate = new Date(date).toISOString().split('T')[0];
    let flag = false
    for(let reservita of this.reservedDates){
      if(reservita.fecha === formattedDate){
        flag = true
      }
    }
    return flag;
  }

  onDateChange(event: any): void {
    const selectedDate = event.target.value;
    if (this.isDateReserved(selectedDate)) {
      console.log('Fecha reservada seleccionada');
    }
  }

  DateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = control.value ? new Date(control.value) : null;
      const currentDate = new Date();
  
      currentDate.setHours(0, 0, 0, 0);
  
      if (selectedDate && selectedDate < currentDate) {
        return { invalidDate: 'La fecha de reserva no puede ser anterior a la fecha actual.' };
      }
  
      return null;
    };
  }

  async send()
  {
    emailjs.init('KsWLMXjVTX33CiV2t')
    let response = await emailjs.send("service_mzntda3","template_68b4nyg",{
      email: this.form.value.email,
      name: this.car.name,
      price: this.car.price,
      fecha: this.form.value.reservationDate
      });
  }
  
}
  

