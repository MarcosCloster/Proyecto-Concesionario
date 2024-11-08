import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../otherComponents/footer/footer.component';
import { HeaderComponent } from '../otherComponents/header/header.component';
import { JsonService } from '../services/json.service';
import { Auto } from '../interfaces/autos';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  sv = inject(JsonService)
  highlightCar: Auto[] = []

  ngOnInit(): void {
    this.getAutos()
  }

  getAutos(){
    this.sv.getJson().subscribe({
      next: (auto: Auto[]) => {
        auto.reverse();
        let i = 0;
        while(i != 5)
        {
          this.highlightCar.push(auto[i])
          i++
        }
        console.log(this.highlightCar)
      },
      error: (error: Error) => {
        console.log(error)
      }
    })
  }
}
