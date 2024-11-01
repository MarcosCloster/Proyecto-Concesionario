import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Auto } from '../interfaces/autos';

@Injectable({
  providedIn: 'root'
})
export class MercadoLibreApiService {

  constructor(private http: HttpClient) { }

  autos: Auto[] = []

  urlBase = "https://api.mercadolibre.com/sites/MLA/search?category=MLA1744"

  getAutosUsados(): Observable<Auto[]>{
    return this.http.get<any>(`${this.urlBase}&condition=used&limit=20`).pipe(
      map(response => {
        return response.results.map((item: any) => ({
          id: item.id, // Asegúrate de incluir un ID único
          name: item.title,
          model: item.attributes.find((attr: any) => attr.id === 'MODEL')?.value_name || '',
          year: parseInt(item.attributes.find((attr: any) => attr.id === 'VEHICLE_YEAR')?.value_name) || 0,
          fuel: item.attributes.find((attr: any) => attr.id === 'FUEL_TYPE')?.value_name || '',
          doors: parseInt(item.attributes.find((attr: any) => attr.id === 'DOORS')?.value_name) || 0,
          kph: parseInt(item.attributes.find((attr: any) => attr.id === 'KILOMETERS')?.value_name) || 0,
          engine: item.attributes.find((attr: any) => attr.id === 'ENGINE_DISPLACEMENT')?.value_name || '',
          transmision: item.attributes.find((attr: any) => attr.id === 'TRANSMISSION')?.value_name || '',
          description: item.attributes.find((attr: any) => attr.id === 'ITEM_CONDITION')?.value_name || '',
          traction: item.attributes.find((attr: any) => attr.id === 'TRACTION_CONTROL')?.value_name || '',
          price: item.price,
          color: item.attributes.find((attr: any) => attr.id === 'COLOR')?.value_name || '',
          photos: item.thumbnail,
          isActive: true
        }));
      })
    );
  }

  getAutosNuevos(): Observable<Auto[]> {
    return this.http.get<any>(`${this.urlBase}&condition=new&limit=20`).pipe(
      map(response => {
        return response.results.map((item: any) => ({
          id: item.id, // Asegúrate de incluir un ID único
          name: item.title,
          model: item.attributes.find((attr: any) => attr.id === 'MODEL')?.value_name || '',
          year: parseInt(item.attributes.find((attr: any) => attr.id === 'VEHICLE_YEAR')?.value_name) || 0,
          fuel: item.attributes.find((attr: any) => attr.id === 'FUEL_TYPE')?.value_name || '',
          doors: parseInt(item.attributes.find((attr: any) => attr.id === 'DOORS')?.value_name) || 0,
          kph: parseInt(item.attributes.find((attr: any) => attr.id === 'KILOMETERS')?.value_name) || 0,
          engine: item.attributes.find((attr: any) => attr.id === 'ENGINE_DISPLACEMENT')?.value_name || '',
          transmision: item.attributes.find((attr: any) => attr.id === 'TRANSMISSION')?.value_name || '',
          description: item.attributes.find((attr: any) => attr.id === 'ITEM_CONDITION')?.value_name || '',
          traction: item.attributes.find((attr: any) => attr.id === 'TRACTION_CONTROL')?.value_name || '',
          price: item.price,
          color: item.attributes.find((attr: any) => attr.id === 'COLOR')?.value_name || '',
          photos: item.thumbnail,
          isActive: true
        }));
      })
    );
  }

  // Funcion para obtener autos que van en los componentes
  // getAutos() {
  //   this.sv.getAutosUsados().subscribe({
  //     next: (autos: Auto[]) => {
  //       for (let auto of autos) {
  //         if (!this.autosGuardados.has(auto.id!)) {
  //           this.function.postJson(auto).subscribe({
  //             next: (car: Auto) => {
  //               console.log('Respuesta del servidor:', car);
  //               this.autosGuardados.add(car.id!); // Añadir el ID del auto a la lista de autos guardados
  //             },
  //             error: (e: Error) => {
  //               console.log(e.message);
  //             },
  //           });
  //         } else {
  //           console.log(`El auto con ID ${auto.id} ya ha sido guardado.`);
  //         }
  //       }
  //     },
  //     error: (error: Error) => {
  //       console.log(error);
  //     }
  //   });
  // }
  
  
  
}
