import { Component, inject, OnInit } from '@angular/core';
import { Auto } from 'src/app/interfaces/autos';
import { MercadoLibreApiService } from 'src/app/services/mercado-libre-api.service';
import { JsonService } from 'src/app/services/json.service';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'] // Corregido a `styleUrls`
})
export class AdminViewComponent {
  sv = inject(MercadoLibreApiService);
  function = inject(JsonService);
  autosGuardados: Set<string> = new Set(); // Para llevar un registro de los autos guardados

  
}
