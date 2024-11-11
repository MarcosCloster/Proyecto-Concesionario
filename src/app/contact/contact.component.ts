import { Component } from '@angular/core';
import { FooterComponent } from '../otherComponents/footer/footer.component';
import { HeaderComponent } from '../otherComponents/header/header.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  Alerta()
  {
    Swal.fire({
    title: '¡Éxito!',
    text: 'El correo ha sido enviado',
    icon: 'success',
    confirmButtonText: 'Aceptar'
    });
  }
}
  