import { Component } from '@angular/core';
import { FooterComponent } from '../otherComponents/footer/footer.component';
import { HeaderComponent } from '../otherComponents/header/header.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

}
