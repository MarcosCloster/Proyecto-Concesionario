import { NotExpr } from '@angular/compiler';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Reserva } from 'src/app/interfaces/reserva';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-view-date',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view-date.component.html',
  styleUrl: './view-date.component.css'
})
export class ViewDateComponent implements OnInit{
  ngOnInit(): void {
    this.getReservation()
  }

  arrayReservation!: Reserva[];
  reservationService = inject(DateService)

  getReservation()
  {
    this.reservationService.getReservation().subscribe({
      next: (reservas) =>
      {
        this.arrayReservation = reservas
      },
      error: (e: Error) =>
      {
        console.log(e.message)
      }
    })
  }
}
