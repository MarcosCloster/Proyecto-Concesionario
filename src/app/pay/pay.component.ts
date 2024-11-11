import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Auto } from '../interfaces/autos';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JsonService } from '../services/json.service';
import { HeaderComponent } from "../otherComponents/header/header.component";
import { FooterComponent } from "../otherComponents/footer/footer.component";
import { DateService } from '../services/date.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent implements OnInit{
  reservedDates: string[] = [];

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
      reservationDate: ['', [Validators.required,  this.DateValidator()]],
      titular: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, this.cardLengthValidator()]],
      cardName: ['', [Validators.required]],
      expiracyDate: ['', [Validators.required, this.expiracyDateValidator()]],
      cvv: ['', [Validators.required, this.cvvLengthValidator()]]
    });

    confirmSubmit() {
      const formData = this.form.get('reservationDate')?.value;
      console.log(formData)
    
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
          Swal.fire({
            title: '¡Reserva pagada!',
            text: 'La reserva se ha realizado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.postReservationDate(formData!)
          this.updateCar()
        } else {
          console.log('El usuario canceló la acción');
        }
      });
    }

  postReservationDate(reservation: string)
  {
    this.reservationService.saveReservation(reservation).subscribe({
      next: (reservationDate: string) =>
      {
        console.log('Fecha Reservada: ', reservationDate)
      },
      error: (e: Error) =>
      {
        console.log(e.message)
      }
    })
  }

  getFechas(): void {
    this.reservationService.getReservation().subscribe({
      next: (response: { reservationDate: string }[]) => {
        this.reservedDates = response.map(reservation => reservation.reservationDate);
        console.log('Fechas', this.reservedDates);
      },
      error: (e) => {
        console.log('Error al obtener las fechas:', e.message);
      },
    });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; 
  }

  isDateReserved(date: string | null): boolean {
    if (!date) return false;
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return this.reservedDates.includes(formattedDate);
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


}
  

