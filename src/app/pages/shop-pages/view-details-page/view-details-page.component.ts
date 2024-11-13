import { Component } from '@angular/core';
import { ViewDetailsComponent } from "../../../shop/view-details/view-details.component";

@Component({
  selector: 'app-view-details-page',
  standalone: true,
  imports: [ViewDetailsComponent],
  templateUrl: './view-details-page.component.html',
  styleUrl: './view-details-page.component.css'
})
export class ViewDetailsPageComponent {

}
