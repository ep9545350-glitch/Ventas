import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    this.cargarTema();
  }

  cambiarTema(tema: string): void {

    // Si no estamos en el navegador, salir
    if (typeof window === 'undefined') {
      return;
    }

    document.body.classList.remove(
      'tema-claro',
      'tema-oscuro',
      'tema-moderno'
    );

    switch (tema) {

      case 'Oscuro':
        document.body.classList.add('tema-oscuro');
        break;

      case 'Modern':
        document.body.classList.add('tema-moderno');
        break;

      default:
        document.body.classList.add('tema-claro');
        break;
    }

    localStorage.setItem('tema', tema);
  }

  cargarTema(): void {

    // Si no estamos en el navegador, salir
    if (typeof window === 'undefined') {
      return;
    }

    const tema = localStorage.getItem('tema') || 'Claro';

    this.cambiarTema(tema);

  }

}
