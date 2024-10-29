import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auto } from '../interfaces/autos';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private http: HttpClient) { }


  urlBase:string = 'http://localhost:3000/autos'

  getJson (): Observable<Auto[]>
  {
    return this.http.get<Auto[]>(this.urlBase)
  }


  postJson (auto: Auto): Observable<Auto>
  {
    return this.http.post<Auto>(this.urlBase, auto)
  }


  putJson (auto: Auto, id: string | null): Observable<Auto>
  {
    return this.http.put<Auto>(`${this.urlBase}/${id}`, auto)
  }

  deleteJson(auto: Auto, id: string): Observable<Auto> {
    return this.http.delete<Auto>(`${this.urlBase}/${id}`);
  }

  getById (id: string | null): Observable<Auto>
  {
    return this.http.get<Auto>(`${this.urlBase}/${id}`)
  }


}