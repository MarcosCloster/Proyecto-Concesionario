import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Auto } from '../interfaces/autos';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JsonService } from '../services/json.service';
import { HeaderComponent } from "../otherComponents/header/header.component";
import { FooterComponent } from "../otherComponents/footer/footer.component";

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent implements OnInit{
    ngOnInit(): void {
      this.routes.paramMap.subscribe(params => {
        this.getCarByID(params.get('id'))
      })
    }

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
    

    form = this.fb.group({
      titular: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      cardName: ['', [Validators.required]],
      expiracyDate: ['', [Validators.required, this.expiracyDateValidator()]],
      cvv: ['', [Validators.required, Validators.minLength(4)]]
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
  

