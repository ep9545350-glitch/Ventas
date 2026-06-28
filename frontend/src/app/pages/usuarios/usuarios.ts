import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css'],
})
export class Usuarios implements OnInit {

  usuarios: any[] = [];

  usuario = {
    nombre: '',
    email: '',
    password: '',
    rol: ''
  };

  usuarioEditando: number | null = null;

  constructor(
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {

    this.usuarioService.obtenerUsuarios().subscribe({

      next: (data) => {

        this.usuarios = data;

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  guardarUsuario(): void {

    if (this.usuarioEditando == null) {

      this.usuarioService.crearUsuario(this.usuario)
      .subscribe({

        next: () => {

          this.limpiarFormulario();

          this.cargarUsuarios();

        }

      });

    } else {

      this.usuarioService.actualizarUsuario(
        this.usuarioEditando,
        this.usuario
      ).subscribe({

        next: () => {

          this.limpiarFormulario();

          this.cargarUsuarios();

        }

      });

    }

  }

  editar(usuario: any): void {

    this.usuarioEditando = usuario.id;

    this.usuario = {

      nombre: usuario.nombre,

      email: usuario.email,

      password: '',

      rol: usuario.rol

    };

  }

  eliminar(id: number): void {

    if (!confirm("¿Eliminar usuario?")) return;

    this.usuarioService.eliminarUsuario(id)
    .subscribe({

      next: () => {

        this.cargarUsuarios();

      }

    });

  }

  limpiarFormulario(): void {

    this.usuario = {

      nombre: '',

      email: '',

      password: '',

      rol: ''

    };

    this.usuarioEditando = null;

  }

  get totalUsuarios(): number {

    return this.usuarios.length;

  }

  get totalAdministradores(): number {

    return this.usuarios.filter(
      u => u.rol === 'Administrador'
    ).length;

  }

  get totalCajeros(): number {

    return this.usuarios.filter(
      u => u.rol === 'Cajero'
    ).length;

  }

}
