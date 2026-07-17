import { Dashboard } from './pages/dashboard/dashboard';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Productos } from './pages/productos/productos';
import { Ventas } from './pages/ventas/ventas';
import { Usuarios } from './pages/usuarios/usuarios';
import { Reportes } from './pages/reportes/reportes';
import { Configuracion } from './pages/configuracion/configuracion';
import { Login } from './pages/login/login';
import { Adminlayout } from './layout/admin-layout/admin-layout';
import { authGuard } from './services/auth';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'login', component: Login },

  {
    path: '',
    component: Adminlayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'productos', component: Productos },
      { path: 'ventas', component: Ventas },
      { path: 'usuarios', component: Usuarios },
      { path: 'reportes', component: Reportes },
      { path: 'configuracion', component: Configuracion }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
