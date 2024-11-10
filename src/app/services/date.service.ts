import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private url = 'http://localhost:3000/reservation';

  constructor(private http: HttpClient) {}

  saveReservation(reservationDate: string): Observable<string> {
    return this.http.post<string>(this.url, {reservationDate});
  }

  getReservation(): Observable<{ reservationDate: string }[]> {
    return this.http.get<{ reservationDate: string }[]>(this.url);
  }

 
}
