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

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: Adminlayout,
    children: [
      { path: '', component: Dashboard },
      { path: 'productos', component: Productos },
      { path: 'ventas', component: Ventas },
      { path: 'usuarios', component: Usuarios },
      { path: 'reportes', component: Reportes },
      { path: 'configuracion', component: Configuracion }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
