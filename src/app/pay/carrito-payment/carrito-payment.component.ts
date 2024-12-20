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
import emailjs from '@emailjs/browser';
import { Reserva } from 'src/app/interfaces/reserva';

@Component({
  selector: 'app-carrito-payment',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './carrito-payment.component.html',
  styleUrl: './carrito-payment.component.css'
})
export class CarritoPaymentComponent implements OnInit{
  reservedDates: Reserva[] = [];
  totalPrice: number = 0;
  ngOnInit(): void {
    this.getCarrito();
    this.getFechas();
    this.getNameCart(); 
    this.getCarritoPrice();
    console.log('askldaksld',this.nameCartArray)
    console.log(this.totalPrice)
  }

  cartArray!: Auto[]
  
  reservationService= inject(DateService)  
  cartService = inject(CarritoService)
  fb = inject(FormBuilder)
  carService = inject(JsonService)
  router= inject(Router)
  nameCartArray: String[] = [];

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
      email: ['', Validators.required],
      reservationDate: ['', [Validators.required,  this.DateValidator()]],
      titular: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, this.cardLengthValidator()]],
      name: '',
      price: 0,
      cardName: ['', [Validators.required]],
      expiracyDate: ['', [Validators.required, this.expiracyDateValidator()]],
      cvv: ['', [Validators.required, this.cvvLengthValidator()]]
    });

    reserva: Reserva = {
      idAuto: [],
      fecha: '',
      email: '',
      nombre: ''
    }

    setValues(){
      this.reserva.fecha = this.form.get('reservationDate')!.value ?? ''
      this.reserva.email = this.form.get('email')!.value ?? ''
      for(let auto of this.cartArray){
        this.reserva.idAuto.push(auto.id!)
      }
      this.reserva.nombre = this.form.get('titular')!.value ?? ''
    }

    confirmSubmit() {
      const formData = this.form.get('reservationDate')?.value;
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
          this.form.patchValue({
            name: this.nameCartArray.join(', '),
            price: this.totalPrice
          });
    
          this.postReservationDate();
          Swal.fire({
            title: '¡Reserva pagada!',
            text: 'La reserva se ha realizado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.send();
            this.clearCarrito();
            this.router.navigateByUrl('');
            this.updateCar();
          });
        } else {
          console.log('El usuario canceló la acción');
        }
      });
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

  getCarritoPrice ()
  {

    let sum=0;
    for(let cart of this.cartArray)
    {
      console.log('price', cart.price)
      sum += cart.price
    }
    this.totalPrice = sum;
    console.log(this.totalPrice)
  }

  async send() {
    emailjs.init('KsWLMXjVTX33CiV2t');
    const response = await emailjs.send("service_mzntda3", "template_68b4nyg", {
      email: this.form.value.email,
      name: this.form.value.name, // Se envía el valor actualizado
      price: this.form.value.price, // Se envía el precio total actualizado
      fecha: this.form.value.reservationDate
    });
  }

  getNameCart()
  {
    for(let car of this.cartArray)
    {
      this.nameCartArray.push(car.name)
      
    }
    console.log(this.nameCartArray)
  }

  updateCar()
    {
      for (let car of this.cartArray)
      {
        car.isActive = false;
        this.carService.putJson(car, car.id!).subscribe({
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

