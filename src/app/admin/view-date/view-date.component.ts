import { CommonModule } from '@angular/common';
import { NotExpr } from '@angular/compiler';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Reserva } from 'src/app/interfaces/reserva';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-view-date',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './view-date.component.html',
  styleUrl: './view-date.component.css'
})
export class ViewDateComponent implements OnInit {
  ngOnInit(): void {
    this.getReservation();
  }

  arrayReservation: Reserva[] = [];
  filteredReservations: Reserva[] = []; // Lista filtrada para mostrar en la tabla
  filterText: string = ''; // Texto ingresado en la barra de búsqueda
  reservationService = inject(DateService);

  getReservation() {
    this.reservationService.getReservation().subscribe({
      next: (reservas) => {
        this.arrayReservation = reservas;
        this.filteredReservations = reservas; // Inicialmente, mostramos todas las reservas
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    });
  }

  filterReservations() {
    const filter = this.filterText.toLowerCase();
    this.filteredReservations = this.arrayReservation.filter(reserva =>
      reserva.nombre.toLowerCase().includes(filter) || // Filtra por nombre
      reserva.email.toLowerCase().includes(filter) || // Filtra por email
      reserva.id!.toString().includes(filter) || // Filtra por id
      reserva.idAuto.toString().includes(filter) || // Filtra por id de auto 
      reserva.fecha.toString().includes(filter) // filtra por fecha
      
    );
  }
}