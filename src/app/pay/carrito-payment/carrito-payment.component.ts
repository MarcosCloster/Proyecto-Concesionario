import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../otherComponents/header/header.component";
import { CarritoComponent } from "../../carrito/carrito.component";
import { FooterComponent } from "../../otherComponents/footer/footer.component";
import { Auto } from 'src/app/interfaces/autos';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito-payment',
  standalone: true,
  imports: [HeaderComponent, CarritoComponent, FooterComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './carrito-payment.component.html',
  styleUrl: './carrito-payment.component.css'
})
export class CarritoPaymentComponent implements OnInit{
  ngOnInit(): void {
    this.getCarrito()
    console.log(this.cartArray)
  }

  cartArray!: Auto[]
  
  cartService = inject(CarritoService)
  fb = inject(FormBuilder)
  selectedDate: string = '';
  selectedTime: string = '';
  availableTimes: string[] = [];
  
  makeReservation() {
    if (this.selectedTime) {
      alert(`Reserva realizada para el ${this.selectedDate} a las ${this.selectedTime}`);
    }
  }

    getCarrito()
    {
      this.cartArray = this.cartService.getCartItems()
      console.log(this.cartArray)
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
        if (value.length === 4) {
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
      titular: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      cardName: ['', [Validators.required, this.cardLengthValidator()]],
      expiracyDate: ['', [Validators.required, this.expiracyDateValidator()]],
      cvv: ['', [Validators.required, this.cvvLengthValidator()]]
    });

  confirmSubmit()
    {
      if(this.form.invalid) return alert("Completar todos los formularios")
        const isConfirmed = window.confirm('¿Está seguro de que desea enviar?');
    if (isConfirmed) {
      alert('Reserva pagada')
    } else {
      console.log('El usuario canceló la acción');
    }
  }
}
