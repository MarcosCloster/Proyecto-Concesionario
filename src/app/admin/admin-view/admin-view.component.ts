import { Component, inject, OnInit } from '@angular/core';
import { Auto } from 'src/app/interfaces/autos';
import { MercadoLibreApiService } from 'src/app/services/mercado-libre-api.service';
import { JsonService } from 'src/app/services/json.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'] // Corregido a `styleUrls`
})
export class AdminViewComponent{

  sv = inject(MercadoLibreApiService);
  function = inject(JsonService);
  autosGuardados: Set<string> = new Set();
  authService = inject(AuthService)
  router = inject(Router)

  logout() {
     this.authService.logout(); 
     this.router.navigate(['/login']);
   } // Redirige al usuario a la página de login }
   // Para llevar un registro de los autos guardados

   /*getAutos() {
     this.sv.getAutosUsados().subscribe({
       next: (autos: Auto[]) => {
         for (let auto of autos) {
           if (!this.autosGuardados.has(auto.id!)) {
             this.function.postJson(auto).subscribe({
               next: (car: Auto) => {
                 console.log('Respuesta del servidor:', car);
                 this.autosGuardados.add(car.id!); // Añadir el ID del auto a la lista de autos guardados
               },
               error: (e: Error) => {
                 console.log(e.message);
               },
             });
           } else {
             console.log(`El auto con ID ${auto.id} ya ha sido guardado.`);
           }
         }
       },
       error: (error: Error) => {
         console.log(error);
       }
     });
   }*/
}
