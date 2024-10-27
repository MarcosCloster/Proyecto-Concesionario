import { Component } from '@angular/core';
import { FooterComponent } from '../otherComponents/footer/footer.component';
import { HeaderComponent } from '../otherComponents/header/header.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

}
