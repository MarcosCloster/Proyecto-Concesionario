import { Component } from '@angular/core';
import { AboutUsComponent } from "../../about-us/about-us.component";

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [AboutUsComponent],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.css'
})
export class AboutUsPageComponent {

}
