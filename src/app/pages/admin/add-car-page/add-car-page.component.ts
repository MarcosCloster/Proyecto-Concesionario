import { Component } from '@angular/core';
import { AddCarComponent } from "../../../admin/add-car/add-car.component";

@Component({
  selector: 'app-add-car-page',
  standalone: true,
  imports: [AddCarComponent],
  templateUrl: './add-car-page.component.html',
  styleUrl: './add-car-page.component.css'
})
export class AddCarPageComponent {

}
