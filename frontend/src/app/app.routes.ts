import { Dashboard } from './pages/dashboard/dashboard';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'path';
import { Productos } from './pages/productos/productos';
import { Ventas } from './pages/ventas/ventas';
import { Usuarios } from './pages/usuarios/usuarios';
import { Reportes } from './pages/reportes/reportes';

export const routes: Routes = [
  {path: '',component:Dashboard},
{path: 'productos', component:Productos},
{path: 'ventas', component:Ventas},
{path: 'usuarios', component:Usuarios},
{path: 'reportes', component:Reportes}
];
