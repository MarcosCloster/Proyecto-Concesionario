import { Component } from '@angular/core';
import { AdminViewComponent } from "../../../admin/admin-view/admin-view.component";

@Component({
  selector: 'app-admin-view-page',
  standalone: true,
  imports: [AdminViewComponent],
  templateUrl: './admin-view-page.component.html',
  styleUrl: './admin-view-page.component.css'
})
export class AdminViewPageComponent {

}
