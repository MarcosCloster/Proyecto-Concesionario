import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  });
  
  showPassword = false;

  verificarLogin() {
    const name = this.form.get('name')?.value;
    const password = this.form.get('password')?.value;
  
    if (this.authService.login(name!, password!)) {
      Swal.fire({
        title: 'Ingreso de usuario con exito',
        text: 'Se ha ingresado sesion',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(result =>{
        this.router.navigateByUrl('/admin/view');
      this.form.reset();
      });
    } else {
      Swal.fire({
        title: 'Error al Ingresar',
        text: 'No existe ese usuario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  
  togglePasswordVisibility() { 
    this.showPassword = !this.showPassword; 
  }
  
}
