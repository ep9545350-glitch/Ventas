import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ─── Interfaces ───────────────────────────────────────────────

export interface Rol {
  id: string;
  nombre: string;
  icono: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  rol: string;
  estado: 'activo' | 'inactivo';
  fechaIngreso: string;
  dni: string;
}

export interface FormUsuario {
  nombre: string;
  correo: string;
  telefono: string;
  rol: string;
  estado: 'activo' | 'inactivo';
  fechaIngreso: string;
  dni: string;
}


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class Usuarios implements OnInit {

  // ── Roles disponibles ──
  roles: Rol[] = [
    { id: 'admin',      nombre: 'Administrador', icono: 'ti-shield-check'  },
    { id: 'cajero',     nombre: 'Cajero',        icono: 'ti-cash-register' },
    { id: 'vendedor',   nombre: 'Vendedor',      icono: 'ti-tag'           },
    { id: 'almacenero', nombre: 'Almacenero',    icono: 'ti-package'       },
    { id: 'supervisor', nombre: 'Supervisor',    icono: 'ti-eye-check'     },
  ];

  // ── Datos (reemplaza con tu servicio) ──
  usuarios: Usuario[] = [
    { id: 1, nombre: 'Carlos Mendoza Ríos',   correo: 'carlos@empresa.com',  telefono: '987 654 321', rol: 'admin',      estado: 'activo',   fechaIngreso: '01/03/2023', dni: '45678901' },
    { id: 2, nombre: 'María López Torres',    correo: 'maria@empresa.com',   telefono: '912 345 678', rol: 'cajero',     estado: 'activo',   fechaIngreso: '15/06/2023', dni: '72345678' },
    { id: 3, nombre: 'Juan Pérez Huanca',     correo: 'juan@empresa.com',    telefono: '956 789 012', rol: 'vendedor',   estado: 'activo',   fechaIngreso: '20/09/2023', dni: '61234567' },
    { id: 4, nombre: 'Ana Rojas Castillo',    correo: 'ana@empresa.com',     telefono: '943 210 987', rol: 'almacenero', estado: 'inactivo', fechaIngreso: '10/01/2024', dni: '53456789' },
    { id: 5, nombre: 'Pedro Flores Mamani',   correo: 'pedro@empresa.com',   telefono: '921 876 543', rol: 'supervisor', estado: 'activo',   fechaIngreso: '05/03/2024', dni: '48765432' },
    { id: 6, nombre: 'Lucía García Vargas',   correo: 'lucia@empresa.com',   telefono: '',            rol: 'cajero',     estado: 'activo',   fechaIngreso: '18/05/2024', dni: '67890123' },
  ];

  private nextId = 7;

  // ── Filtros ──
  buscarTexto  = '';
  filtroRol    = '';
  filtroEstado = '';

  // ── Modal ──
  modalVisible = false;
  editandoId: number | null = null;

  form: FormUsuario = this.formVacio();

  // ── Toast ──
  toastVisible = false;
  toastMsg     = '';
  private toastTimer: any;

  // ─────────────────────────────────────────────────────────────

  ngOnInit() {}

  // ── Computed ──

  usuariosFiltrados(): Usuario[] {
    const q = this.buscarTexto.toLowerCase();
    return this.usuarios.filter(u => {
      const matchTexto  = !q || u.nombre.toLowerCase().includes(q) || u.correo.toLowerCase().includes(q);
      const matchRol    = !this.filtroRol    || u.rol    === this.filtroRol;
      const matchEstado = !this.filtroEstado || u.estado === this.filtroEstado;
      return matchTexto && matchRol && matchEstado;
    });
  }

  totalActivos()   { return this.usuarios.filter(u => u.estado === 'activo').length; }
  totalInactivos() { return this.usuarios.filter(u => u.estado === 'inactivo').length; }
  totalRoles()     { return new Set(this.usuarios.map(u => u.rol)).size; }

  // ── Helpers ──

  iniciales(nombre: string): string {
    return nombre
      .split(' ')
      .slice(0, 2)
      .map(n => n[0]?.toUpperCase() ?? '')
      .join('');
  }

  getRolNombre(rolId: string): string {
    return this.roles.find(r => r.id === rolId)?.nombre ?? rolId;
  }

  getRolIcono(rolId: string): string {
    return this.roles.find(r => r.id === rolId)?.icono ?? 'ti-user';
  }

  getRolColor(rolId: string): { bg: string; text: string } {
    const map: Record<string, { bg: string; text: string }> = {
      admin:      { bg: '#EEF2FF', text: '#312E81' },
      cajero:     { bg: '#E1F5EE', text: '#085041' },
      vendedor:   { bg: '#DBEAFE', text: '#1E3A8A' },
      almacenero: { bg: '#FAEEDA', text: '#633806' },
      supervisor: { bg: '#F3E8FF', text: '#5B21B6' },
    };
    return map[rolId] ?? { bg: '#f3f4f6', text: '#374151' };
  }

  getPayClass(pay: string): string {
    const map: Record<string, string> = {
      efectivo: 'pay-cash', tarjeta: 'pay-card', yape: 'pay-yape',
    };
    return map[pay] ?? '';
  }

  // ── CRUD ──

  prepararNuevo() {
    this.editandoId  = null;
    this.form        = this.formVacio();
    this.modalVisible = true;
  }

  editarUsuario(usuario: Usuario) {
    this.editandoId = usuario.id;
    this.form = {
      nombre:       usuario.nombre,
      correo:       usuario.correo,
      telefono:     usuario.telefono,
      rol:          usuario.rol,
      estado:       usuario.estado,
      fechaIngreso: usuario.fechaIngreso,
      dni:          usuario.dni,
    };
    this.modalVisible = true;
  }

  guardarUsuario() {
    if (!this.form.nombre.trim() || !this.form.correo.trim() || !this.form.rol) return;

    if (this.editandoId !== null) {
      const idx = this.usuarios.findIndex(u => u.id === this.editandoId);
      if (idx !== -1) {
        this.usuarios[idx] = { id: this.editandoId, ...this.form };
        this.usuarios = [...this.usuarios];
      }
      this.showToast('Usuario actualizado correctamente');
    } else {
      this.usuarios = [
        ...this.usuarios,
        { id: this.nextId++, ...this.form }
      ];
      this.showToast('Usuario registrado exitosamente');
    }

    this.cerrarModal();
  }

  eliminarUsuario(id: number) {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
    this.showToast('Usuario eliminado');
  }

  toggleEstado(usuario: Usuario) {
    const idx = this.usuarios.findIndex(u => u.id === usuario.id);
    if (idx !== -1) {
      this.usuarios[idx] = {
        ...this.usuarios[idx],
        estado: this.usuarios[idx].estado === 'activo' ? 'inactivo' : 'activo'
      };
      this.usuarios = [...this.usuarios];
      const nuevoEstado = this.usuarios[idx].estado;
      this.showToast(`Usuario ${nuevoEstado === 'activo' ? 'activado' : 'desactivado'}`);
    }
  }

  cerrarModal() {
    this.modalVisible = false;
    this.editandoId   = null;
    this.form         = this.formVacio();
  }

  // ── Privados ──

  private formVacio(): FormUsuario {
    const hoy = new Date().toISOString().split('T')[0];
    return {
      nombre:       '',
      correo:       '',
      telefono:     '',
      rol:          'cajero',
      estado:       'activo',
      fechaIngreso: hoy,
      dni:          '',
    };
  }

  private showToast(msg: string) {
    clearTimeout(this.toastTimer);
    this.toastMsg     = msg;
    this.toastVisible = true;
    this.toastTimer   = setTimeout(() => (this.toastVisible = false), 2500);
  }
}
