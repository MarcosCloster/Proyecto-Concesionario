import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isMenuOpen = false;
  isSmallScreen = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 972;
    // Cierra el menú automáticamente si es una pantalla grande
    if (!this.isSmallScreen) {
      this.isMenuOpen = false;
    }
  }
}
