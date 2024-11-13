import { Component } from '@angular/core';
import { DeleteCarComponent } from "../../../admin/delete-car/delete-car.component";

@Component({
  selector: 'app-delete-car-page',
  standalone: true,
  imports: [DeleteCarComponent],
  templateUrl: './delete-car-page.component.html',
  styleUrl: './delete-car-page.component.css'
})
export class DeleteCarPageComponent {

}
