import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Reserva } from '../interfaces/reserva';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private url = 'http://localhost:3000/reservation';

  constructor(private http: HttpClient) {}

  saveReservation(date: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.url, date);
  }

  getReservation(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.url);
  }

  getReservationByDate(date: string): Observable<Reserva> {
    const params = new HttpParams().set('fecha', date);
    return this.http.get<Reserva>(this.url, { params });
  }

 
}
