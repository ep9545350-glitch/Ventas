import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  //----------------------------------
  // Animaciones
  //----------------------------------

  sideHovered = false;
  cardHovered = false;

  //----------------------------------
  // Inyección de dependencias
  //----------------------------------

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  //----------------------------------
  // Estado
  //----------------------------------

  cargando = false;

  error = '';

  //----------------------------------
  // Formulario
  //----------------------------------

  loginForm = this.fb.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(4)
      ]
    ]

  });

  //----------------------------------
  // Hover
  //----------------------------------

  onSideEnter() {
    this.sideHovered = false;
    this.cardHovered = false;
  }

  onSideLeave() {
    this.sideHovered = false;
  }

  onCardEnter() {
    this.cardHovered = false;
    this.sideHovered = false;
  }

  onCardLeave() {
    this.cardHovered = false;
  }

  //----------------------------------
  // LOGIN
  //----------------------------------

  onSubmit() {

    this.error = '';

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.cargando = true;

    this.authService.login({

      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!

    }).subscribe({

      next: (respuesta) => {

        localStorage.setItem(
          'token',
          respuesta.access_token
        );

        localStorage.setItem(
          'rol',
          respuesta.rol
        );

        this.router.navigateByUrl('/');

      },

      error: () => {

        this.error = 'Correo o contraseña incorrectos';

        this.cargando = false;

      },

      complete: () => {

        this.cargando = false;

      }

    });

  }

}
