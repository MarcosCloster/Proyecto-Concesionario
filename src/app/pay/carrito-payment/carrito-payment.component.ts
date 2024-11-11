import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../otherComponents/header/header.component";
import { CarritoComponent } from "../../carrito/carrito.component";
import { FooterComponent } from "../../otherComponents/footer/footer.component";
import { Auto } from 'src/app/interfaces/autos';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CarritoService } from 'src/app/services/carrito.service';
import { DateService } from 'src/app/services/date.service';
import { CommonModule } from '@angular/common';
import { JsonService } from 'src/app/services/json.service';
import Swal from 'sweetalert2'
import { routes } from 'src/app/app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito-payment',
  standalone: true,
  imports: [HeaderComponent, CarritoComponent, FooterComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './carrito-payment.component.html',
  styleUrl: './carrito-payment.component.css'
})
export class CarritoPaymentComponent implements OnInit{
  reservedDates: string[] = [];
  ngOnInit(): void {
    this.getCarrito()
    this.getFechas()
  }

  cartArray!: Auto[]
  
  reservationService= inject(DateService)  
  cartService = inject(CarritoService)
  fb = inject(FormBuilder)
  carService = inject(JsonService)
  router= inject(Router)


    getCarrito()
    {
      this.cartArray = this.cartService.getCartItems()
    }

    clearCarrito()
    {
      this.cartService.clearCart()
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
          this.postReservationDate(formData!)
          Swal.fire({
            title: '¡Reserva pagada!',
            text: 'La reserva se ha realizado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result)=>
          {
            this.clearCarrito()
            this.router.navigateByUrl('')

          })
          
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

  updateCarrito()
  {
    for(let car of this.cartArray)
    {
      car.isActive = false
      this.carService.putJson(car,car.id!).subscribe({
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
  }


}
