import { RouterLink, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { Navbar } from '../../shared/navbar/navbar';
import { Dashboard } from '../../pages/dashboard/dashboard';

@Component({
  selector: 'app-admin-layout',
  imports: [Sidebar, Navbar, Dashboard, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class Adminlayout {}
